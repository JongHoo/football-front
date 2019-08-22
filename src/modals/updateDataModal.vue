<template lang="pug">
#update-data-modal
  .title
    span {{ title }}
  v-select(:items="leagueList" v-model="selectedLeague")
  v-select(:items="seasonList" v-model="selectedSeason")
  .btn-area
    v-btn(color="#ef4656" @click="onClose()" :disabled="isLoading") CANCEL
    v-btn(color="#76ef59" @click="onSave()" :disabled="isLoading") OK
</template>

<script>
import commonApi from '../common/commonApi'

export default {
  name: 'updateDataModal',
  props: {
    title: String,
    saveCtgry: String,
    leagueList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      isLoading: false,
      selectedLeague: 'premier-league',
      selectedSeason: '19-20',
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
    },
    onSave () {
      if (this.saveCtgry === 'TEAM') {
        this.requestUpdateTeams()
      } else if (this.saveCtgry === 'STANDING') {
        this.requestUpdateStandings()
      } else if (this.saveCtgry === 'MATCH') {
        this.requestUpdateMatches()
      }
    },
    requestUpdateTeams () {
      this.isLoading = true
      commonApi.updateTeams(this.selectedLeague, this.selectedSeason)
        .then((res) => {
          this.isLoading = false
          this.$emit('alertResult', 'S')
          this.$emit('close')
        })
        .catch(err => {
          console.log(err)
          this.isLoading = false
          this.$emit('alertResult', 'F')
          this.$emit('close')
        })
    },
    requestUpdateStandings () {
      this.isLoading = true
      commonApi.updateStandings(this.selectedLeague, this.selectedSeason)
        .then((res) => {
          this.isLoading = false
          this.$emit('alertResult', 'S')
          this.$emit('close')
        })
        .catch(err => {
          console.log(err)
          this.isLoading = false
          this.$emit('alertResult', 'F')
          this.$emit('close')
        })
    },
    requestUpdateMatches () {
      this.isLoading = true
      commonApi.updateMatches(this.selectedLeague, this.selectedSeason)
        .then((res) => {
          this.isLoading = false
          this.$emit('alertResult', 'S')
          this.$emit('close')
        })
        .catch(err => {
          console.log(err)
          this.isLoading = false
          this.$emit('alertResult', 'F')
          this.$emit('close')
        })
    }
  }
}
</script>

<style lang="less" scoped>
#update-data-modal {
  padding: 20px;
  & > .btn-area {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
