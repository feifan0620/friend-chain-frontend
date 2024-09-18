<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  avatar: {
    type: Number,
    default: 1
  },
  username: {
    type: Number,
    default: 1
  },
  tags: {
    type: Number,
    default: 1
  },
  desc: {
    type: Number,
    default: 1
  }
})

// 随机昵称
const nicknames = ref([
  '晨曦微露',
  '星月相随',
  '风语者',
  '时光旅人',
  '云端漫步',
  '夜幕低垂',
  '雨落心间',
  '花影流年',
  '静谧森林',
  '梦境边缘',
  '星月如画'
])

const personalIntros = ref([
  '热爱生活，享受每一刻的美好。',
  '喜欢探索未知，追求无限可能。',
  '热爱编程，用代码创造价值。',
  '旅行爱好者，足迹遍布世界各地。',
  '音乐是我的灵魂伴侣，陪伴我度过每个日夜。',
  '摄影发烧友，记录生活的每一个瞬间。',
  '热爱阅读，书籍是我最好的朋友。',
  '乐观向上，相信每一天都是新的开始。',
  '健身达人，健康的身体是革命的本钱。',
  '美食家，享受烹饪的乐趣。',
  '爱读书，喜欢阅读，喜欢阅读，喜欢阅读。'
])

const userTags = ref([
  ['编程高手'],
  ['前端开发', 'Vue.js 爱好者'],
  ['算法专家', '数据结构'],
  ['后端开发'],
  ['人工智能', '机器学习', '深度学习'],
  ['网络安全'],
  ['游戏开发', 'Unity3D', 'C#'],
  ['数据库管理', 'MySQL 专家'],
  ['操作系统', 'Linux 爱好者', 'Windows 开发'],
  ['UI 设计', '交互设计'],
  ['产品经理', '用户体验']
])
</script>

<template>
  <div class="user-item">
    <t-avatar
      class="user-avatar"
      size="80px"
      shape="round"
      :image="`https://tdesign.gtimg.com/mobile/demos/avatar${props.avatar}.png`"
    />
    <div class="user-info">
      <div class="user-nickname">{{ nicknames[username] }}</div>
      <div class="user-tags">
        <t-tag variant="light" v-for="item in userTags[tags]" :key="item">{{ item }}</t-tag>
      </div>
      <div class="user-desc">
        <span>{{ personalIntros[desc] }}</span>
      </div>
    </div>
    <t-button size="small" theme="light" class="contact-me-btn">联系我</t-button>
  </div>
</template>

<style scoped>
.user-item {
  width: 95vw;
  height: 108px;
  margin: 10px auto;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 8px;
  .user-avatar {
    margin-right: 10px;
    align-self: center;
  }
  .user-info {
    width: 50vw;
    display: flex;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .user-nickname {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 6px;
    }
    .user-tags {
      margin-bottom: 6px;
      overflow: hidden; /* 隐藏超出容器的内容 */
      white-space: nowrap;
      text-overflow: ellipsis;
      color: transparent;
      .t-tag {
        margin-right: 4px;
        font-size: 10px;
        color: #999999;
      }
    }

    .user-desc {
      width: 95%;
      white-space: nowrap;
      overflow: hidden; /* 隐藏超出容器的内容 */
      text-overflow: ellipsis; /* 超出部分显示省略号 */
      font-size: 14px;
      color: #bbb;
    }
  }
  .contact-me-btn {
    align-self: center;
  }
}
</style>
