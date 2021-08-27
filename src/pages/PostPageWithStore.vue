<template>
  <div>
    <h1>Likes count: {{ $store.state.likes }}</h1>
    <div class="likes__wrapper">
      <my-button @click="$store.commit('incrementLikes')">
        Like
      </my-button>
      <my-button @click="$store.commit('decrementLikes')">
        Dislike
      </my-button>
    </div>
    <my-input
        :model-value="searchQuery"
        @update:model-value="setSearchQuery"
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
          :model-value="selectedSort"
          @update:mode-value="setSelectedSort"
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
  </div>
</template>

<script>
import PostForm from '@/components/PostForm'
import PostList from '@/components/PostList'
import MyModal from '@/components/UI/MyModal'
import MyButton from '@/components/UI/MyButton'
import MySelect from '@/components/UI/MySelect'
import MyInput from '@/components/UI/MyInput'
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'

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
      modalVisible: false,
    }
  },
  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort'
    }),
    ...mapActions({
      loadMorePosts: 'post/loadMorePosts',
      fetchPosts: 'post/fetchPosts',
    }),
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
  },
  mounted() {
    this.fetchPosts()
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      modificatorValue: state => state.post.modificatorValue,
      isPostsLoading: state => state.post.isPostsLoading,
      selectedSort: state => state.post.selectedSort,
      searchQuery: state => state.post.searchQuery,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages,
      sortOptions: state => state.post.sortOptions,
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts',
    }),
  },
  watch: {
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

.likes__wrapper {
  display: flex;
  gap: 10px;
}

.observer {
}
</style>