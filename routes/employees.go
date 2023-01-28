package routes

import (
	"errors"
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/tyrohansen/simplehrm/database"
	"github.com/tyrohansen/simplehrm/models"
	"gorm.io/gorm/clause"
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

func HandleCreateEmployee(c *fiber.Ctx) error {
	var employee models.Employee

	if err := c.BodyParser(&employee); err != nil {
		return c.Status(500).JSON(err.Error())
	}

	database.Database.Db.Create(&employee)
	return c.Status(200).JSON(employee)
}

func HandleFetchEmployees(c *fiber.Ctx) error {
	employees := []models.Employee{}
	database.Database.Db.Preload(clause.Associations).Find(&employees)
	return c.Status(200).JSON(&employees)
}

func findEmployee(id int, emp *models.Employee) error {
	database.Database.Db.Find(&emp, "id = ?", id)
	if emp.ID == 0 {
		return errors.New("Item not found!")
	}
	return nil
}

func HandleGetEmployeeDetails(c *fiber.Ctx) error {
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

func HandleUpdateEmployee(c *fiber.Ctx) error {
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

	database.Database.Db.Where("id = ?", id).Updates(&form)
	return c.Status(200).JSON(form)
}

func HandleDeleteEmployee(c *fiber.Ctx) error {
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

func HandleUploadEmployeePicture(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
	var employee models.Employee

	if err != nil {
		return c.Status(500).JSON(Message{Detail: err.Error()})
	}

	file, err := c.FormFile("photo")
	if err != nil {
		return c.Status(422).JSON(Message{Detail: "We were not able upload your attachment"})
	}

	if err := findEmployee(id, &employee); err != nil {
		return c.Status(404).JSON(Message{Detail: err.Error()})
	}

	c.SaveFile(file, fmt.Sprintf("./web/build/photos/%s", file.Filename))
	database.Database.Db.Model(&employee).Update("photo", file.Filename)

	return c.Status(200).JSON(Message{Detail: "Successfully Uploaded photo"})

}
