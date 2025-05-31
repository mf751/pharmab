package data

import (
	"context"
	"database/sql"
	"errors"
	"time"

	"golang.org/x/crypto/bcrypt"
)

var ErrWrongCredentials = errors.New("wrong Credentials")

type UserModel struct {
	DB *sql.DB
}

type User struct {
	ID             int    `json:"id"`
	Name           string `json:"name"`
	Email          string `json:"email"`
	IsAdmin        bool   `json:"is_admin"`
	CreatedAt      string `json:"created_at"`
	HashedPassword []byte `json:"-"`
}

func (m UserModel) Login(email, password string) (*User, error) {
	sqlQuery := `
SELECT id, name, is_admin, created_at, password_hash FROM users
WHERE users.email = ?
	`
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	var user User

	err := m.DB.QueryRowContext(ctx, sqlQuery, email).Scan(
		&user.ID,
		&user.Name,
		&user.IsAdmin,
		&user.CreatedAt,
		&user.HashedPassword,
	)
	if err != nil {
		switch {
		case errors.Is(err, sql.ErrNoRows):
			return nil, ErrWrongCredentials
		default:
			return nil, err
		}
	}

	err = bcrypt.CompareHashAndPassword(user.HashedPassword, []byte(password))
	if err != nil {
		switch {
		case errors.Is(err, bcrypt.ErrMismatchedHashAndPassword):
			return nil, ErrWrongCredentials
		default:
			return nil, err
		}
	}

	return &user, nil
}

func (m UserModel) Insert(user *User) error {
	sqlQuery := `
INSERT INTO users(name, email, is_admin, password_hash)
VALUES (
	?, ?, ?, ? 
	)
	`
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	_, err := m.DB.ExecContext(
		ctx,
		sqlQuery,
		user.Name,
		user.Email,
		user.IsAdmin,
		user.HashedPassword,
	)
	if err != nil {
		return err
	}

	return nil
}
