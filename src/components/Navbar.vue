<template>
  <div class="navbar">
    <h3 class="title" @click="$router.push('/')">Vue 3</h3>
    <div class="navbar__buttons">
      <my-button @click="$router.push('/')">
        Main
      </my-button>
      <my-button @click="$router.push('/posts')">
        Posts
      </my-button>
      <my-button @click="$router.push('/about')">
        About
      </my-button>
    </div>
  </div>
</template>

<script>

export default {
}
</script>

<style scoped>
.title {
  cursor: pointer;
}

.title:hover {
  opacity: 0.5;
  transition: all 0.3s;
}

.navbar {
  padding: 20px;
  background-color: lightgray;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  gap: 50px;
}

.navbar__buttons {
  margin-left: auto;
}

.navbar__buttons > button {
  margin-left: 20px;
}
</style>