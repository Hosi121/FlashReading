import api from "./api";
import { ChatRequest, ChatResponse } from "../types/chat";

// チャットの質問を送信する関数
export const sendChatMessage = async (input: ChatRequest): Promise<ChatResponse> => {
  try {
    const response = await api.post<ChatResponse>("/chat/ask", input);
    return response.data;
  } catch (error) {
    console.error("Failed to send chat message:", error);
    throw error;
  }
};
