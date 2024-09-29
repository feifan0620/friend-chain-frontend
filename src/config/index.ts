import { type Component, markRaw } from 'vue'
import { v4 as uuidv4 } from 'uuid'

type User = {
  name: string
  avatar: string
}

export type Message = {
  id: number | string
  type: 'user' | 'robot'
  msg: {
    text: string
    imgUrl?: string
  }
  compontent?: Array<Component>
}

export const robot: User = {
  name: '客服小T',
  avatar: 'https://tdesign.gtimg.com/miniprogram/images/avatar1.png'
}

export const user: User = {
  name: 'Feifan',
  avatar: 'https://avatars.githubusercontent.com/u/42566669?v=4'
}

export const mockMessageList: Array<Message> = [
  {
    id: uuidv4(),
    type: 'robot',
    msg: {
      text: '你好！我是XXX。我们现在可以开始聊天了'
    }
  }
]

export const rotbotReply = (item: string): Message => {
  switch (item) {
    default:
      return {
        id: uuidv4(),
        type: 'robot',
        msg: {
          text: '对不起，我不明白你的意思'
        }
      }
  }
}
