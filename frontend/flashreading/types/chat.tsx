export interface ChatRequest {
  content: string;  // ユーザーから送信されるメッセージ
}

export interface ChatResponse {
  choices: Choice[]; // 応答の選択肢
}

export interface Choice {
  message: Message; // 各選択肢に含まれるメッセージ
}

export interface Message {
  role: string;     // メッセージの役割 (assistant, user, system)
  content: string;  // メッセージの内容
}


