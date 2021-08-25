<template>
  <div
    class="modal"
    v-if="isVisible"
    @click="hideModal"
  >
    <div
      class="dialog__content"
      @click.stop
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-modal',
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hideModal() {
      this.$emit('update:isVisible', false)
    }
  }
}
</script>

<style scoped>
.modal {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  display: flex;
}

.dialog__content {
  padding: 20px;
  margin: auto;
  background: #fff;
  border-radius: 12px;
  min-height: 50px;
  min-width: 300px;
}
</style>