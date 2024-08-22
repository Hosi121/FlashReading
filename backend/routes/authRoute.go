package routes

import (
	"github.com/Hosi121/FlashReading/controllers"
	"github.com/gin-gonic/gin"
)

func AuthRoutes(r *gin.Engine) {
	r.POST("/register", controllers.Register)
	r.POST("/login", controllers.Login)
	r.POST("/logout", controllers.Logout)
}

