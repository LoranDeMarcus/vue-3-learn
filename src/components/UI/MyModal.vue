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
import toggleMixin from '@/mixins/toggleMixin'

export default {
  name: 'my-modal',
  mixins: [toggleMixin]
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