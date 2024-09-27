<script lang="ts" setup>
import { h, onMounted, type Ref } from 'vue'
import { AddIcon } from 'tdesign-icons-vue-next'
import { IconFont } from 'tdesign-icons-vue-next'
import { getTeamList } from '@/api/team'
import { ref } from 'vue'
import router from '@/router'
// @ts-ignore
import TeamItem from '@/components/TeamItem.vue'
import type { Team } from '@/models/team'
import moment from 'moment'
const iconFunc = () => h(AddIcon, { size: '24px' })

const teamList: Ref<Array<Team>> = ref() as Ref<Array<Team>>

const tabValue = ref('public')

const onTabValueChange = (val: string) => {
  if (val === 'encrypt') {
    getTeamData(teamSearchValue.value, 2)
  } else {
    getTeamData(teamSearchValue.value)
  }
}

const getTeamData = async (searchValue = '', status = 0) => {
  const res = await getTeamList({
    searchText: searchValue,
    pageNum: 1,
    status: status
  })
  teamList.value = res.data
  teamList.value.map((item) => {
    if (item.expireTime) {
      // @ts-ignore
      return (item.expireTime = moment(new Date(item.expireTime)).format(
        'YYYY-MM-DD HH:mm'
      ))
    }
  })
}

onMounted(() => {
  getTeamData()
})
const teamSearchValue = ref('')
const onTeamSearch = () => {
  if (tabValue.value === 'public') {
    getTeamData(teamSearchValue.value)
  } else {
    getTeamData(teamSearchValue.value)
  }
}
</script>

<template>
  <div class="team">
    <div class="team-tab-bar">
      <t-tabs size="large" v-model="tabValue" @change="onTabValueChange">
        <t-tab-panel value="public">
          <template #label>
            <div class="label-content">
              <icon-font name="usergroup-add" size="large" />
              <span>公开</span>
            </div>
          </template>
        </t-tab-panel>
        <t-tab-panel value="encrypt">
          <template #label>
            <div class="label-content">
              <icon-font name="lock-on" size="large" />
              <span>加密</span>
            </div>
          </template>
        </t-tab-panel>
      </t-tabs>
    </div>
    <div class="team-search">
      <t-search
        v-model.trim="teamSearchValue"
        placeholder="请输入队伍关键字"
        @submit="onTeamSearch"
      ></t-search>
    </div>
    <div v-if="teamList?.length > 0" class="team-list">
      <TeamItem
        v-for="item in teamList"
        :key="item.id"
        :teamInfo="item"
      ></TeamItem>
    </div>
    <t-empty
      v-else
      class="empty"
      image="https://tdesign.gtimg.com/mobile/demos/empty1.png"
      description="暂无可加入队伍"
    />
    <t-fab
      :icon="iconFunc"
      :draggable="false"
      style="right: 20px; bottom: 68px"
      @click="router.push('/team/add')"
    />
  </div>
</template>

<style scoped>
.team {
  background-color: #f3f3f3;
  padding-bottom: 95px;
  padding-top: 48px;
  position: relative;
  min-height: 100vh;
  .team-tab-bar {
    width: 100vw;
    z-index: 100;
    top: 96px;
    position: fixed;
    .label-content {
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        margin-left: 3px;
      }
    }
  }
  .team-list {
    padding-top: 96px;
  }
  .team-search {
    z-index: 100;
    width: 100vw;
    position: fixed;
    top: 48px;
    background-color: #fff;
    padding: 8px 16px;
  }
  .empty {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
