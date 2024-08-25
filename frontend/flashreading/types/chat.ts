export interface ChatRequest {
  message: string; // ユーザーが送信するメッセージ
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

export interface RequestMessage {
  role: 'assistant' | 'user' | 'system'; // メッセージの役割
  content: string; // メッセージの本文
}

export interface ChatRequestPayload { // サーバーに送信するためのリクエストペイロード
  model: string;
  messages: RequestMessage[];
  max_tokens: number;
}
