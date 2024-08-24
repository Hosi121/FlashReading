package routes

import (
	"time"

	"github.com/Hosi121/FlashReading/controllers"
	"github.com/gin-gonic/gin"
)

func ChatRoute(router *gin.Engine, apiKey string) {
	chatController := controllers.NewChatController(
		"gpt-3.5-turbo", // 使用するモデル
		apiKey,          // 環境変数から取得したAPIキー
		100,             // max tokens
		20*time.Second,  // timeout
	)

	chatGroup := router.Group("/chat")
	{
		chatGroup.POST("/ask", chatController.AskQuestion)
	}
}
