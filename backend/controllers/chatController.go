package controllers

import (
	"net/http"
	"time"

	"github.com/Hosi121/FlashReading/chat"

	"github.com/gin-gonic/gin"
)

type ChatController struct {
	chatCompletions *chat.ChatCompletions
}

// NewChatController は新しい ChatController を作成します
func NewChatController(model string, secret string, maxTokens int, timeout time.Duration) *ChatController {
	chatCompletions := chat.NewChatCompletions(model, secret, maxTokens, timeout)
	return &ChatController{
		chatCompletions: chatCompletions,
	}
}

// AskQuestion は1つの質問に対する応答を返します
func (cc *ChatController) AskQuestion(c *gin.Context) {
	var request chat.Request
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	// Chat APIにメッセージを送信
	response, err := cc.chatCompletions.SendMessage(request.Messages)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get response"})
		return
	}

	c.JSON(http.StatusOK, response)
}

