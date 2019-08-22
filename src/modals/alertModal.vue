<template lang="pug">
#alert-modal
  .title
    span {{ title }}
  .content
    span {{ content }}
  .btn-area
    v-btn(color="green" @click="onClose()") OK
</template>

<script>
export default {
  name: 'alertModal',
  props: {
    title: String,
    content: String
  },
  methods: {
    onClose () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>
#alert-modal {
  padding: 20px;
  & > .content {
    margin-top: 15px;
  }
  & > .btn-area {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
