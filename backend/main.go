package main

import (
	"log"
	"os"

	"github.com/Hosi121/FlashReading/middleware"
	"github.com/Hosi121/FlashReading/models"
	"github.com/Hosi121/FlashReading/routes"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// 環境変数をロード
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// 環境変数からAPIキーを取得
	apiKey := os.Getenv("OPENAI_API_KEY")
	if apiKey == "" {
		log.Fatal("OPENAI_API_KEY is not set in .env file")
	}

	r := gin.Default()

	// CORS ミドルウェアを適用
	r.Use(middleware.CORSMiddleware())

	models.ConnectDatabase()

	// データベース接続を設定
	models.SetDatabase(models.DB)

	// ルートを設定
	routes.AuthRoutes(r)
	routes.ChatRoute(r, apiKey)

	// ポートを指定してサーバーを起動
	port := os.Getenv("PORT")
	if port == "" {
		port = "8081"
	}
	r.Run(":" + port)
}
