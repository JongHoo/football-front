<template lang="pug">
#admin
  .card-wrapper
    v-card.mx-auto(width="300")
      v-card-title.headline 팀 목록 업데이트
      v-card-text 리그, 시즌별 팀 목록을 업데이트 합니다.
      v-card-actions
        v-btn(@click="openUpdateDialog('team')") Update
    v-card.mx-auto(width="300")
      v-card-title.headline 팀 순위 업데이트
      v-card-text 리그, 시즌별 팀 순위를 업데이트 합니다.
      v-card-actions
        v-btn(@click="openUpdateDialog('standing')") Update
    v-card.mx-auto(width="300")
      v-card-title.headline 경기 일정 업데이트
      v-card-text 리그, 시즌별 경기 일정을 업데이트 합니다.
      v-card-actions
        v-btn(@click="openUpdateDialog('match')") Update
  .text-xs-center
    v-dialog(v-model="isDialog" width="400")
      v-card
        v-card-title(class="headline" primary-title) Select Options
        v-card-text 리그 및 시즌을 입력하세요.
        v-card-actions
          v-spacer
          v-btn(color="red" flat="flat" @click="isDialog=false") CANCEL
          v-btn(color="green" flat="flat" @click="isDialog=false") OK
</template>

<script>
export default {
  name: 'Admin',
  data () {
    return {
      isDialog: false
    }
  },
  methods: {
    openUpdateDialog (ctgry) {
      this.isDialog = true
    }
  }
}
</script>

<style lang="less" scoped>
#admin {
  & > .card-wrapper {
    display: flex;
  }
}
</style>
