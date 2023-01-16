package routes

import (
	"errors"

	"github.com/gofiber/fiber/v2"
	"github.com/tyrohansen/simplehrm/database"
	"github.com/tyrohansen/simplehrm/models"
)

type Employee struct {
	ID              uint   `json:"id"`
	FirstName       string `json:"first_name"`
	LastName        string `json:"last_name"`
	Gender          string `json:"gender"`
	DepartmentRefer int    `json:"department_id"`
	JobTitle        string `json:"job_title"`
	Section         string `json:"section"`
	IdNo            string `json:"id_no"`
	Nin             string `json:"nin"`
	DateJoined      string `json:"date_joined"`
	MaritalStatus   string `json:"marital_status"`
	BirthPlace      string `json:"birth_place"`
	Residence       string `json:"residence"`
	Dob             string `json:"date_of_birth"`
	KinName         string `json:"kin_name"`
	KinContact      string `json:"kin_contact"`
	Photo           string `json:"photo"`
	EContact        string `json:"emergency_contact"`
	Comment         string `json:"comment" gorm:"type:text"`
}

func CreateEmployee(c *fiber.Ctx) error {
	var employee models.Employee

	if err := c.BodyParser(&employee); err != nil {
		return c.Status(500).JSON(err.Error())
	}

	database.Database.Db.Create(&employee)
	return c.Status(200).JSON(employee)
}

func FetchEmployees(c *fiber.Ctx) error {
	employees := []models.Employee{}
	database.Database.Db.Find(&employees)
	return c.Status(200).JSON(&employees)
}

func findEmployee(id int, emp *models.Employee) error {
	database.Database.Db.Find(&emp, "id = ?", id)
	if emp.ID == 0 {
		return errors.New("Item not found!")
	}
	return nil
}

func GetEmployeeDetails(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
	var employee models.Employee

	if err != nil {
		return c.Status(500).JSON(Message{Detail: err.Error()})
	}

	if err := findEmployee(id, &employee); err != nil {
		return c.Status(404).JSON(Message{Detail: err.Error()})
	}

	return c.Status(200).JSON(employee)

}

func UpdateEmployee(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
	var employee models.Employee

	if err != nil {
		return c.Status(500).JSON(Message{Detail: err.Error()})
	}

	if err := findEmployee(id, &employee); err != nil {
		return c.Status(404).JSON(Message{Detail: err.Error()})
	}
	var form Employee
	if err := c.BodyParser(&form); err != nil {
		return c.Status(400).JSON(Message{Detail: err.Error()})
	}
	return c.Status(200).JSON(employee)
}

func DeleteEmployee(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
	var employee models.Employee

	if err != nil {
		return c.Status(500).JSON(Message{Detail: err.Error()})
	}

	if err := findEmployee(id, &employee); err != nil {
		return c.Status(404).JSON(Message{Detail: err.Error()})
	}

	if err := database.Database.Db.Delete(&employee).Error; err != nil {
		return c.Status(500).JSON(Message{Detail: err.Error()})
	}

	return c.Status(200).JSON(Message{Detail: "Successfully Deleted Department"})

}
