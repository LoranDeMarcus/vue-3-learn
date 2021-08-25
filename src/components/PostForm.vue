<template>
  <form class="form" @submit.prevent>
    <h4>Создание поста</h4>
    <my-input
        v-model="post.title"
        type="text"
        placeholder="Название поста"
    />
    <my-input
        v-model="post.body"
        type="text"
        placeholder="Описание"
    />
    <my-button
        class="button"
        @click="createPost"
    >
      Создать
    </my-button>
  </form>
</template>

<script>

export default {
  data() {
    return {
      post: {
        title: '',
        body: '',
      },
    }
  },
  methods: {
    createPost() {
      this.post.id = Date.now()
      this.$emit('create', this.post)
      this.post = {
        title: '',
        body: '',
      }
    },
  },
}
</script>

<style scoped>
.form {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

.button {
  align-self: flex-end;
  margin-top: 15px;
}
</style>