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
	app.Get("/api/employees/", routes.FetchEmployees)
	app.Post("/api/employees/", routes.CreateEmployee)
	app.Get("/api/employees/:id", routes.GetEmployeeDetails)
	app.Put("/api/employees/:id", routes.UpdateEmployee)
	app.Delete("/api/employees/:id", routes.DeleteEmployee)
}

func main() {
	database.ConnectDb()
	app := fiber.New()
	setupRoutes(app)

	log.Fatal(app.Listen(":3000"))
}
