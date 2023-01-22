package main

import (
	"fmt"
	"log"
	"net/http"
	"os/exec"
	"runtime"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/filesystem"
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

	// leave request routes
	app.Get("/api/leave_requests/", routes.HandleGetLeaveRequests)
	app.Post("/api/leave_requests/", routes.HandleCreateLeaveRequest)
	app.Get("/api/leave_requests/employee/:id", routes.HandleGetEmployeeLeaveRequests)
	app.Get("/api/leave_requests/:id", routes.HandleGetLeaveRequestDetails)
	app.Put("/api/leave_requests/:id", routes.HandleUpdateLeaveRequest)
	app.Delete("/api/leave_requests/:id", routes.HandleDeleteLeaveRequest)

}

func main() {
	database.ConnectDb()
	app := fiber.New()
	app.Use(filesystem.New(filesystem.Config{
		Root:   http.Dir("./web/build"),
		Browse: true,
		Index:  "index.html",
		//NotFoundFile: "404.html",
		MaxAge: 3600,
	}))
	app.Use(cors.New())
	setupRoutes(app)
	openbrowser("http://localhost:18000/")
	log.Fatal(app.Listen(":18000"))

}

func openbrowser(url string) {
	var err error
	switch runtime.GOOS {
	case "linux":
		err = exec.Command("xdg-open", url).Start()
	case "windows":
		err = exec.Command("rundll32", "url.dll,FileProtocolHandler", url).Start()
	case "darwin":
		err = exec.Command("open", url).Start()
	default:
		err = fmt.Errorf("unsupported platform")
	}
	if err != nil {
		log.Fatal(err)
	}
}
