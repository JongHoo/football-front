<template lang="pug">
#update-data-modal
  v-select(:items="leagueList" v-model="selectedLeague")
  v-select(:items="seasonList" v-model="selectedSeason")
  v-card-actions
    v-spacer
    v-btn(color="red" flat="flat" @click="onClose()") CANCEL
    v-btn(color="green" flat="flat") OK
</template>

<script>
export default {
  name: 'updateDataModal',
  data () {
    return {
      selectedLeague: '',
      selectedSeason: '19-20',
      leagueList: [],
      seasonList: [
        {
          text: '17-18',
          value: '17-18'
        },
        {
          text: '18-19',
          value: '18-19'
        },
        {
          text: '19-20',
          value: '19-20'
        }
      ]
    }
  },
  methods: {
    onClose () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>
#update-data-modal {
  padding: 20px;
}
</style>
