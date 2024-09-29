<script setup lang="ts">
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import {
  type Message,
  mockMessageList,
  robot,
  rotbotReply,
  user
} from '@/config/index'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
const router = useRouter()

const route = useRoute()

const avatar = route.query.avatar

const userName = route.query.name
const containerRef = ref<HTMLDivElement | null>(null)
const inputRef = ref<HTMLInputElement>()
const inputValue = ref('')
const messgeList = ref<Array<Message>>([
  {
    id: uuidv4(),
    type: 'robot',
    msg: {
      text: `你好！我是${userName}。我们现在可以开始聊天了`
    }
  }
])
const init = () => {
  const dom = containerRef.value as HTMLDivElement
  if (dom) {
    setTimeout(() => {
      dom.scrollTo(0, dom.scrollHeight + 100)
    }, 0)
  }
}

const userSpeak = (item: string) => {
  const userMsg: Message = {
    id: uuidv4(),
    type: 'user',
    msg: {
      text: item
    }
  }
  messgeList.value.push(userMsg)
  robotSpeak(item)
}

const robotSpeak = (item: string) => {
  const mesInfo = rotbotReply(item)
  messgeList.value.push(mesInfo)
  init()
}

const sendMsg = () => {
  userSpeak(inputValue.value)
  inputValue.value = ''
  inputRef.value?.blur()
}

const onPressEnter = () => {
  sendMsg()
}
</script>

<template>
  <div class="chat-view">
    <t-navbar
      :title="userName"
      animation
      left-arrow
      @left-click="router.back()"
      class="chat-navbar"
    >
    </t-navbar>
    <div class="chat-view__container" ref="containerRef">
      <template v-for="item in messgeList" :key="item.id">
        <!-- robot -->
        <div class="chat-view-robot" v-if="item.type === 'robot'">
          <div class="chat-view-robot__avatar">
            <t-avatar size="small" class="img" :image="avatar">
              {{ (userName as string)?.substring(0, 2) }}
            </t-avatar>
          </div>
          <div class="chat-view-robot__content">
            <div class="chat-view-robot__name">{{ userName }}</div>
            <!-- 机器消息 -->
            <div class="chat-view-robot__msgBox">
              <div class="chat-view-robot__message" v-if="item.msg.text">
                <span class="text">{{ item.msg.text }}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 用户 -->
        <div class="chat-view-user" v-if="item.type === 'user'">
          <div class="chat-view-user__content">
            <div class="chat-view-user__name">
              {{ userStore.userInfo?.username }}
            </div>
            <div class="chat-view-user__msgBox">
              <div class="chat-view-user__message">
                <span>{{ item.msg.text }}</span>
              </div>
            </div>
          </div>
          <div class="chat-view-user__avatar">
            <img class="img" :src="userStore.userInfo?.avatarUrl" alt="" />
          </div>
        </div>
      </template>
    </div>
    <div class="chat-view-footer">
      <div class="chat-view-footer__inputBox">
        <input
          class="input"
          @keydown.enter="onPressEnter"
          ref="inputRef"
          v-model="inputValue"
          enterkeyhint="send"
        />
        <t-button
          class="button"
          :disabled="inputValue.trim().length <= 0"
          @click="sendMsg"
          shape="round"
          theme="primary"
          >发送</t-button
        >
      </div>
    </div>
  </div>
</template>

<style lang="less">
.chat-view {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding-top: 48px;
  background-color: #f3f3f3ff;
  &__container {
    flex: 1;
    padding: 20px 12px;
    overflow-y: scroll;
  }
}

.chat-view-robot {
  display: flex;

  &__component {
    border-radius: 9px;
    width: calc(100% - 28px);
    background-color: #fff;
  }

  &__avatar {
    margin-right: 8px;
    width: 40px;
    height: 40px;
    border-radius: 50%;

    .img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  &__content {
    flex: 1;
    width: 100%;
  }

  &__name {
    margin-bottom: 2px;
    line-height: 16px;
    font-size: 10px;
    color: rgba(0, 0, 0, 0.6);
  }

  &__msgBox {
    display: flex;
    width: 100%;
    margin-bottom: 16px;
  }

  &__message {
    display: flex;
    flex-direction: column;
    padding: 12px;
    background-color: #fff;
    max-width: calc(100% - 52px);
    border-radius: 0 12px 12px 12px;

    .text {
      font-size: 14px;
      line-height: 22px;
      color: rgba(0, 0, 0, 0.9);
    }

    .img {
      margin-top: 12px;
      width: 100%;
    }
  }
}

.chat-view-user {
  margin-bottom: 16px;
  display: flex;

  &__avatar {
    margin-left: 8px;
    width: 40px;
    height: 40px;
    border-radius: 50%;

    .img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  &__content {
    flex: 1;
  }

  &__name {
    text-align: right;
    margin-bottom: 2px;
    line-height: 16px;
    font-size: 10px;
    color: rgba(0, 0, 0, 0.6);
  }

  &__msgBox {
    display: flex;
    flex-direction: row-reverse;
    width: 100%;
  }

  &__message {
    font-size: 14px;
    line-height: 22px;
    color: rgba(0, 0, 0, 0.9);
    padding: 12px;
    background-color: #d9e1ff;
    max-width: calc(100% - 52px);
    border-radius: 12px 0 12px 12px;
  }
}

.chat-view-footer {
  position: relative;

  &__inputBox {
    background-color: #fff;
    padding: 12px;
    display: flex;
    align-items: center;
    height: 64px;

    .input {
      box-sizing: border-box;
      padding: 8px 16px;
      margin-right: 12px;
      flex: 1;
      height: 40px;
      font-size: 16px;
      border-radius: 40px;
      outline: none;
      border: 1px solid #dcdcdcff;
      background-color: #f3f3f3ff;
    }

    .button {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      width: 64px;
      height: 40px;
    }
  }

  &__keyword {
    position: absolute;
    bottom: 88px;
    width: 100%;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom: 0.5px solid #e7e7e7ff;
  }
}
</style>
