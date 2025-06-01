package main

import (
	"context"
	"embed"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"

	"pharmaB/backend"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// Create an instance of the app structure
	app := backend.NewApp()

	// Create application with options
	err := wails.Run(&options.App{
		Title:  "pharmaB",
		Width:  1920,
		Height: 1028,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 229, G: 229, B: 229, A: 1},
		OnStartup:        app.Startup,
		Bind: []interface{}{
			app,
		},
		OnShutdown: func(ctx context.Context) {
			app.DataModel.DB.Close()
		},
	})
	if err != nil {
		println("Error:", err.Error())
	}
}
