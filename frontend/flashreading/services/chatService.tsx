import { ChatRequest, ChatResponse, RequestMessage } from "../types/chat";
import api from "../services/api";

export const sendChatMessage = async (input: ChatRequest): Promise<ChatResponse> => {
  try {
    // サーバーサイドの期待するリクエスト形式に合わせる
    const requestPayload = {
      model: "your-model-id", // 必要に応じてモデルIDを設定
      messages: [
        {
          role: "user",
          content: input.message,
        },
      ],
      max_tokens: 100, // 必要に応じて設定
    };

    const response = await api.post<ChatResponse>("/chat/ask", requestPayload);
    return response.data;
  } catch (error) {
    console.error("Failed to send chat message:", error);
    throw error;
  }
};
