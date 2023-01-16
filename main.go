package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/tyrohansen/simplehrm/database"
	"github.com/tyrohansen/simplehrm/routes"
)

func welcome(c *fiber.Ctx) error {
	return c.SendString("Welcome to an Awesome API")
}

func setupRoutes(app *fiber.App) {
	app.Get("/api", welcome)
	// department routes
	app.Get("/api/departments/", routes.GetDepartments)
	app.Post("/api/departments/", routes.CreateDepartment)
	app.Get("/api/departments/:id", routes.GetDepartmentDetails)
	app.Put("/api/departments/:id", routes.UpdateDepartment)
	app.Delete("/api/departments/:id", routes.DeleteDepartment)

	// employee routes
}

func main() {
	database.ConnectDb()
	app := fiber.New()
	setupRoutes(app)

	log.Fatal(app.Listen(":3000"))
}
