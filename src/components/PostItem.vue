<template>
  <div class="post">
    <div>
      №{{ post.id }}
      <div><strong>Название:</strong> {{ post.title }}</div>
      <div><strong>Описание:</strong> {{ post.body }}</div>
    </div>
    <div class="post__buttons">
      <my-button
        @click="$router.push(`/post/${post.id}`)"
      >
        Открыть
      </my-button>
      <my-button
        @click="$emit('remove', post)"
      >
        Удалить
      </my-button>
    </div>
  </div>
</template>

<script>
import MyButton from '@/components/UI/MyButton'
export default {
  components: {MyButton},
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.post {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  padding: 15px;
  border: 2px solid teal;
}

.post__buttons {
  display: flex;
  gap: 15px;
}
</style>