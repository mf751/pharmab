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
	HashedPassword string `json:"-"`
	PhoneNumber    string `json:"phone_number"`
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

	err = bcrypt.CompareHashAndPassword([]byte(user.HashedPassword), []byte(password))
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
INSERT INTO users(name, email, is_admin, password_hash, phone_number)
VALUES (
	?, ?, ?, ?, ?
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
		user.PhoneNumber,
	)
	if err != nil {
		return err
	}

	return nil
}

func (m UserModel) GetUsers() (*[]User, error) {
	sqlQuery := `
SELECT id, name, email, is_admin, created_at, phone_number FROM users
	`
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	rows, err := m.DB.QueryContext(ctx, sqlQuery)
	if err != nil {
		return nil, err
	}

	var users []User

	for rows.Next() {
		var user User
		err = rows.Scan(
			&user.ID,
			&user.Name,
			&user.Email,
			&user.IsAdmin,
			&user.CreatedAt,
			&user.PhoneNumber,
		)
		if err != nil {
			return nil, err
		}

		users = append(users, user)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return &users, nil
}

func (m UserModel) UpdateUser(user *User) error {
	sqlQuery := `
UPDATE users
SET name = ?, email = ?, is_admin = ?, phone_number = ?
WHERE id = ?
	`
	sqlQueryWithPassword := `
UPDATE users
SET name = ?, email = ?, is_admin = ?, phone_number = ?, password_hash = ?
WHERE id = ?
	`
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	var err error
	if user.HashedPassword == "" {
		_, err = m.DB.QueryContext(
			ctx,
			sqlQuery,
			user.Name,
			user.Email,
			user.IsAdmin,
			user.PhoneNumber,
			user.ID,
		)
	} else {
		_, err = m.DB.QueryContext(
			ctx,
			sqlQueryWithPassword,
			user.Name,
			user.Email,
			user.IsAdmin,
			user.PhoneNumber,
			user.HashedPassword,
			user.ID,
		)
	}
	return err
}
