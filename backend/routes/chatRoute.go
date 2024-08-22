package routes

import (
	"github.com/Hosi121/FlashReading/controllers"
	"github.com/gin-gonic/gin"
	"time"
)

func ChatRoute(router *gin.Engine) {
	chatController := controllers.NewChatController(
		"gpt-3.5-turbo", // 使用するモデル
		"your_openai_api_key", // 環境変数から取得するのが望ましい
		100,               // max tokens
		20*time.Second,    // timeout
	)

	chatGroup := router.Group("/chat")
	{
		chatGroup.POST("/ask", chatController.AskQuestion)
	}
}


