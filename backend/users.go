package backend

import (
	"github.com/wailsapp/wails/v2/pkg/runtime"
	"golang.org/x/crypto/bcrypt"

	"pharmaB/internal/data"
)

type LoginResponse struct {
	User  data.User `json:"user"`
	Error string    `json:"error"`
}

type GetUsersResponse struct {
	Users []data.User `json:"users"`
	Error string      `json:"error"`
}

func (app *App) Login(email, password string) LoginResponse {
	user, err := app.UserModel.Login(email, password)
	if err != nil {
		return LoginResponse{Error: err.Error()}
	}
	return LoginResponse{User: *user}
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
	user.HashedPassword = string(hash)

	err = app.UserModel.Insert(user)
	if err != nil {
		runtime.LogPrint(app.ctx, err.Error())
	}

	return err == nil
}

func (app *App) GetUsers() GetUsersResponse {
	users, err := app.UserModel.GetUsers()
	if err != nil {
		return GetUsersResponse{Error: err.Error()}
	}
	return GetUsersResponse{Users: *users}
}
