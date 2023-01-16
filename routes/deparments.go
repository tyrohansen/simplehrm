package routes

import (
	"errors"

	"github.com/gofiber/fiber/v2"
	"github.com/tyrohansen/simplehrm/database"
	"github.com/tyrohansen/simplehrm/models"
)

type Department struct {
	ID        uint   `json:"id"`
	Name      string `json:"name"`
	ShortName string `json:"short_name"`
}

func createDeptResponse(dept models.Department) Department {
	return Department{ID: dept.ID, Name: dept.Name, ShortName: dept.ShortName}
}

func findDepartment(id int, dept *models.Department) error {
	database.Database.Db.Find(&dept, "id = ?", id)
	if dept.ID == 0 {
		return errors.New("Item not found!")
	}
	return nil
}

func CreateDepartment(c *fiber.Ctx) error {
	var dept models.Department

	if err := c.BodyParser(&dept); err != nil {
		return c.Status(400).JSON(err.Error())
	}

	database.Database.Db.Create(&dept)
	return c.Status(200).JSON(createDeptResponse(dept))
}

func GetDepartments(c *fiber.Ctx) error {
	depts := []models.Department{}
	database.Database.Db.Find(&depts)
	return c.Status(200).JSON(depts)
}

func GetDepartmentDetails(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
	var dept models.Department
	if err != nil {
		return c.Status(400).JSON("ID not provided")
	}

	if err := findDepartment(id, &dept); err != nil {
		return c.Status(404).JSON(Message{Detail: err.Error()})
	}

	return c.Status(200).JSON(dept)
}

func UpdateDepartment(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
	var dept models.Department
	if err != nil {
		return c.Status(400).JSON(Message{Detail: "ID not provided"})
	}

	if err := findDepartment(id, &dept); err != nil {
		return c.Status(404).JSON(err.Error())
	}

	var form Department
	if err := c.BodyParser(&form); err != nil {
		return c.Status(400).JSON(err.Error())
	}

	dept.Name = form.Name
	dept.ShortName = form.ShortName
	database.Database.Db.Save(&dept)

	return c.Status(200).JSON(&dept)
}

func DeleteDepartment(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
	var dept models.Department
	if err != nil {
		return c.Status(400).JSON(Message{Detail: "ID not provided"})
	}

	if err := findDepartment(id, &dept); err != nil {
		return c.Status(404).JSON(err.Error())
	}

	if err := database.Database.Db.Delete(&dept).Error; err != nil {
		return c.Status(500).JSON(Message{Detail: err.Error()})
	}

	return c.Status(200).JSON(Message{Detail: "Successfully deleted Department"})
}
