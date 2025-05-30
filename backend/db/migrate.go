package db

import (
	"database/sql"
	"embed"
	"os"
	"path/filepath"

	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/sqlite"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/golang-migrate/migrate/v4/source/iofs"
	_ "modernc.org/sqlite"
)

func GetDBPath() (string, error) {
	appData, err := os.UserConfigDir() // usually %AppData%
	if err != nil {
		return "", err
	}
	dir := filepath.Join(appData, "MyApp")
	os.MkdirAll(dir, 0755) // Ensure directory exists
	return filepath.Join(dir, "data.db"), nil
}

//go:embed migrations/*.sql
var embeddedMigrations embed.FS

func RunMigrations(db *sql.DB) error {
	driver, _ := sqlite.WithInstance(db, &sqlite.Config{})
	d, _ := iofs.New(embeddedMigrations, "migrations")
	m, _ := migrate.NewWithInstance("iofs", d, "sqlite", driver)
	_ = m.Up()
	return nil
}
