package backend

import (
	"context"
	"database/sql"
	"fmt"
	"log"

	"pharmaB/backend/db"
	"pharmaB/internal/data"
)

// App struct
type App struct {
	ctx       context.Context
	DataModel data.DataModel
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) Startup(ctx context.Context) {
	a.ctx = ctx
	dbPath, err := db.GetDBPath()
	if err != nil {
		log.Fatal("Failed to get DB path:", err)
	}

	conn, err := sql.Open("sqlite", dbPath)
	if err != nil {
		log.Fatalln("failed to make db connection", err.Error())
		panic(err)
	}
	fmt.Println("Connected to sql")
	a.DataModel = data.DataModel{
		DB: conn,
	}

	err = db.RunMigrations(conn)
	if err != nil {
		log.Fatalln("migrations failed")
		panic(err)
	}
}

func (a *App) AddTest(text string) bool {
	err := a.DataModel.AddTest(text)
	return err == nil
}

func (a *App) GetTests() []string {
	tests, _ := a.DataModel.GetTests()
	return tests
}
