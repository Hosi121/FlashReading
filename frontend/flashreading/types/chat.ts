import api from "../services/api";

export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  usage: Usage;
  choices: Choice[];
}

export interface Usage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

export interface Choice {
  message: ResponseMessage;
  finish_reason: string;
  index: number;
}

export interface ResponseMessage {
  role: 'assistant' | 'user' | 'system';
  content: string;
}

export const sendChatMessage = async (input: ChatRequest): Promise<ChatResponse> => {
  try {
    const response = await api.post<ChatResponse>("/chat/ask", input);
    return response.data;
  } catch (error) {
    console.error("Failed to send chat message:", error);
    throw error;
  }
};