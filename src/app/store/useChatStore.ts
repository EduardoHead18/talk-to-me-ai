import {create} from 'zustand';

interface ChatMessage {
    user: string;
    message: string;
}

interface ChatStore {
    messages: ChatMessage[];
    addMessage: (message: ChatMessage) => void;
    clearMessages: () => void;
}

const useChatStore = create<ChatStore>((set) => ({
    messages: [],
    addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
    clearMessages: () => set({ messages: [] }),
}));

export default useChatStore;