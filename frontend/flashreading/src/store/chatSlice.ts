import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ChatRequest, ChatResponse } from '../../types/chat';
import { sendChatMessage } from '../../services/chatService';

interface ChatState {
  response: ChatResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  response: null,
  loading: false,
  error: null,
};

export const fetchChatResponse = createAsyncThunk(
  'chat/fetchResponse',
  async (request: ChatRequest, { rejectWithValue }) => {
    try {
      const response = await sendChatMessage(request);
      return response;
    } catch (error) {
      return rejectWithValue('Failed to fetch chat response');
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatResponse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChatResponse.fulfilled, (state, action) => {
        state.loading = false;
        state.response = action.payload;
      })
      .addCase(fetchChatResponse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default chatSlice.reducer;