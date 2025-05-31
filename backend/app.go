package backend

import (
	"context"
	"database/sql"
	"fmt"
	"log"

	"github.com/wailsapp/wails/v2/pkg/runtime"

	"pharmaB/backend/db"
	"pharmaB/internal/data"
)

// App struct
type App struct {
	ctx       context.Context
	DataModel *data.DataModel
	UserModel *data.UserModel
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
	a.DataModel = &data.DataModel{
		DB: conn,
	}
	a.UserModel = &data.UserModel{
		DB: conn,
	}

	err = db.RunMigrations(conn)
	if err != nil {
		switch {
		case err.Error() == "no change":
			return
		default:
			runtime.LogPrintf(a.ctx, "%v", err.Error())
			log.Fatalln("migrations failed")
			panic(err)
		}
	}
}
