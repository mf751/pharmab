package backend

import (
	"github.com/wailsapp/wails/v2/pkg/runtime"
	"golang.org/x/crypto/bcrypt"

	"pharmaB/internal/data"
)

func (app *App) Login(email, password string) (*data.User, string) {
	user, err := app.UserModel.Login(email, password)
	if err != nil {
		runtime.LogPrint(app.ctx, err.Error())
		return nil, err.Error()
	}
	return user, ""
}

func (app *App) CreateUser(name, email, password string, isAdmin bool) bool {
	user := &data.User{
		Name:    name,
		Email:   email,
		IsAdmin: isAdmin,
	}
	hash, err := bcrypt.GenerateFromPassword([]byte(password), 12)
	if err != nil {
		return false
	}
	user.HashedPassword = hash

	err = app.UserModel.Insert(user)

	return err == nil
}
