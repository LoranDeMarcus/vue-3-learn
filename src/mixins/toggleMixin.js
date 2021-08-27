export default {
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
  },
  mounted() {

  }
}