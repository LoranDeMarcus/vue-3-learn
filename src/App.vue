<template>
  <div>
    <form class="form">
      <h4>Создание поста</h4>
      <input
          v-bind:value="title"
          @input="title = $event.target.value"
          class="input"
          type="text"
          placeholder="Название поста"
      >
      <input
          v-bind:value="body"
          @input="body = $event.target.value"
          class="input"
          type="text"
          placeholder="Описание"
      >
      <button
          @click="createPost"
          class="button"
      >
        Создать
      </button>
    </form>
    <div class="post" v-for="post in posts">
      <div><strong>Название:</strong> {{ post.title }}</div>
      <div><strong>Описание:</strong> {{ post.body }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [
        {
          id: 1,
          title: 'JavaScript',
          body: 'Описание поста'
        },
        {
          id: 2,
          title: 'JavaScript 2',
          body: 'Описание поста 2'
        },
        {
          id: 3,
          title: 'JavaScript 3',
          body: 'Описание поста 3'
        }
      ],
      title: '',
      body: '',
    }
  },
  methods: {
    createPost() {
      const newPost = {
        id: new Date.now(),
        title: this.title,
        body: this.body
      }
    },
  }
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

.post {
  margin-bottom: 15px;
  padding: 15px;
  border: 2px solid teal;
}
.form {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}
.input {
  width: 100%;
  margin-top: 15px;
  padding: 10px 15px;
  border: 1px solid teal;
}
.button {
  margin-top: 15px;
  padding: 10px 15px;
  background: none;
  color: teal;
  border: 1px solid teal;
  align-self: flex-end;
  cursor: pointer;
}
</style>