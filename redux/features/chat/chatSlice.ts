import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { DefaultStreamChatGenerics, MessageType } from 'stream-chat-expo'

export interface ChatState {
    channel: any,
    thread: MessageType<DefaultStreamChatGenerics> | null,
}

const initialState: ChatState = {
    channel: null,
    thread: null,
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setChannel: (state, action: PayloadAction<any>) => {
            state.channel = action.payload
        },
        setThread: (state, action: PayloadAction<any>) => {
            state.thread = action.payload
        }
    }
})

export const { 
    setChannel,
    setThread
} = chatSlice.actions

export default chatSlice.reducer