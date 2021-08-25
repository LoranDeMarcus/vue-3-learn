<template>
  <div class="app">
    <h1 class="title">Страница с постами</h1>
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
        :posts="posts"
        @remove="removePost"
        v-if="!isPostsLoading"
    />
    <p
      class="loader"
      v-else
    >
      Идет загрузка...
    </p>
  </div>
</template>

<script>
import PostForm from '@/components/PostForm'
import PostList from '@/components/PostList'
import MyModal from '@/components/UI/MyModal'
import MyButton from '@/components/UI/MyButton'
import axios from 'axios'
import MySelect from '@/components/UI/MySelect'

export default {
  components: {
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
      sortOptions: [
        { value: 'title', name: 'По названию' },
        { value: 'body', name: 'По описанию' }
      ]
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
    async fetchPosts() {
      try {
        this.isPostsLoading = true
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
        this.posts = response.data
      } catch (err) {
        console.err('fetchPost ERR', err)
      } finally {
        this.isPostsLoading = false
      }
    },
  },
  mounted() {
    this.fetchPosts()
  },
}
</script>

<style>
body {
  margin: 10px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

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
  100% { color: rgba(34, 34, 34, 0); }
}
@keyframes blink2 {
  100% { color: rgba(34, 34, 34, 0); }
}

</style>