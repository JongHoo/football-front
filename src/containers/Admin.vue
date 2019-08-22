<template lang="pug">
#admin
  .card-wrapper
    v-card.mx-auto(width="300")
      v-card-title.headline 팀 목록 업데이트
      v-card-text 리그, 시즌별 팀 목록을 업데이트 합니다.
      v-card-actions
        v-btn(@click="showUpdateModal('TEAM')") Update
    v-card.mx-auto(width="300")
      v-card-title.headline 팀 순위 업데이트
      v-card-text 리그, 시즌별 팀 순위를 업데이트 합니다.
      v-card-actions
        v-btn(@click="showUpdateModal('STANDING')") Update
    v-card.mx-auto(width="300")
      v-card-title.headline 경기 일정 업데이트
      v-card-text 리그, 시즌별 경기 일정을 업데이트 합니다.
      v-card-actions
        v-btn(@click="showUpdateModal('MATCH')") Update
  modal(name="update-data-modal" width="300" height="auto")
    update-data-modal(
      title="Update"
      :saveCtgry="saveCtgry"
      :leagueList="leagueList"
      @alertResult="showAlertModal"
      @close="closeUpdateModal")
  modal(name="alert-modal" width="300" height="auto")
    alert-modal(:title="resultTitle" :content="resultContent" @close="closeAlertModal")
</template>

<script>
import commonApi from '../common/commonApi'
import AlertModal from '../modals/alertModal'
import UpdateDataModal from '@/modals/updateDataModal'

export default {
  name: 'Admin',
  components: {UpdateDataModal, AlertModal},
  data () {
    return {
      resultTitle: '',
      resultContent: '',
      saveCtgry: '',
      isDialog: false,
      isLoading: false,
      isError: false,
      selectedSeason: '18-19',
      selectedLeague: '',
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
    showUpdateModal (ctgry) {
      this.saveCtgry = ctgry
      this.$modal.show('update-data-modal')
    },
    getLeagueList () {
      commonApi.getLeagues()
        .then(res => {
          res.data.forEach(item => {
            this.leagueList.push(
              {
                text: item.name,
                value: item.league_id
              }
            )
          })
          this.selectedLeague = 'premier-league'
        })
        .catch(err => {
          console.log(err)
        })
    },
    closeAlertModal () {
      this.$modal.hide('alert-modal')
    },
    closeUpdateModal () {
      this.$modal.hide('update-data-modal')
    },
    showAlertModal (result) {
      if (result === 'S') {
        this.resultTitle = '알림'
        this.resultContent = '성공적으로 업데이트를 수행하였습니다.'
        this.$modal.show('alert-modal')
        return
      }
      if (result === 'F') {
        this.resultTitle = '오류'
        this.resultContent = '업데이트 수행중 오류가 발생하였습니다.'
        this.$modal.show('alert-modal')
      }
    }
  },
  created () {
    this.getLeagueList()
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
