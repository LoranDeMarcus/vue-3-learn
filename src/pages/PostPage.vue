<template>
  <div>
    <h1 class="title">Страница с постами</h1>
    <my-input
        v-model="searchQuery"
        placeholder="Поиск..."
    />
    <div class="app__buttons">
      <my-button
          class="open-modal"
          @click="showModal"
      >
        Создать пост
      </my-button>
      <my-select
          v-model="selectedSort"
          :options="sortOptions"
      />
    </div>
    <my-modal
        v-model:is-visible="modalVisible"
    >
      <post-form
          @create="createPost"
      />
    </my-modal>
    <post-list
        :posts="sortedAndSearchedPosts"
        @remove="removePost"
        v-if="!isPostsLoading"
    />
    <p class="loader" v-else>
      Идет загрузка...
    </p>
    <div v-intersection="loadMorePosts" class="observer"></div>
    <!--    <div class="page__wrapper">-->
    <!--      <div-->
    <!--        v-for="pageNumber in totalPages"-->
    <!--        :key="pageNumber"-->
    <!--        class="page"-->
    <!--        :class="{-->
    <!--          'current-page': page === pageNumber-->
    <!--        }"-->
    <!--        @click="changePage(pageNumber)"-->
    <!--      >-->
    <!--        {{ pageNumber }}-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script>
import PostForm from '@/components/PostForm'
import PostList from '@/components/PostList'
import MyModal from '@/components/UI/MyModal'
import MyButton from '@/components/UI/MyButton'
import axios from 'axios'
import MySelect from '@/components/UI/MySelect'
import MyInput from '@/components/UI/MyInput'

export default {
  components: {
    MyInput,
    MySelect,
    MyButton,
    MyModal,
    PostForm, PostList,
  },
  data() {
    return {
      posts: [],
      modalVisible: false,
      modificatorValue: '',
      isPostsLoading: false,
      selectedSort: '',
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По описанию'},
      ],
    }
  },
  methods: {
    createPost(post) {
      this.posts.push(post)
      this.modalVisible = false
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id)
    },
    showModal() {
      this.modalVisible = true
    },
    // changePage(pageNumber) {
    //   this.page = pageNumber
    // },
    async fetchPosts() {
      try {
        this.isPostsLoading = true
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit,
          },
        })
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = response.data
      } catch (err) {
        console.err('fetchPost ERR', err)
      } finally {
        this.isPostsLoading = false
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit,
          },
        })
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = this.posts.concat(response.data)
      } catch (err) {
        console.err('fetchPost ERR', err)
      }
    },
  },
  mounted() {
    this.fetchPosts()

    // const options = {
    //   rootMargin: '0px',
    //   threshold: 1.0,
    // }
    // const callback = (entries, observer) => {
    //   if (entries[0].isIntersecting && this.page < this.totalPages) {
    //     this.loadMorePosts()
    //   }
    // }
    // const observer = new IntersectionObserver(callback, options)
    // observer.observe(this.$refs.observer)
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => {
        return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      })
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(post => post.title?.toLowerCase().includes(this.searchQuery?.toLowerCase()))
    },
  },
  watch: {
    // page() {
    //   this.fetchPosts()
    // }
  },
}
</script>

<style>

.title {
  margin: 15px 0;
}

.app__buttons {
  margin: 15px 0 30px;
  display: flex;
  justify-content: space-between;
}

.loader {
  color: teal;
  font-size: 30px;
  -webkit-animation: blink2 1s linear infinite;
  animation: blink2 1s linear infinite;
}

@-webkit-keyframes blink2 {
  100% {
    color: rgba(34, 34, 34, 0);
  }
}

@keyframes blink2 {
  100% {
    color: rgba(34, 34, 34, 0);
  }
}

.page__wrapper {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
}

.page {
  cursor: pointer;
  border: 1px solid teal;
  padding: 15px;
  text-align: center;
}

.current-page {
  border: 2px solid teal;
  background-color: rgba(0, 128, 128, 0.3);
}

.observer {
}
</style>