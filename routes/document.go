package routes

import (
	"errors"

	"github.com/gofiber/fiber/v2"
	"github.com/tyrohansen/simplehrm/database"
	"github.com/tyrohansen/simplehrm/models"
	"gorm.io/gorm/clause"
)

type Document struct {
	Title    string `json:"title"`
	Filename string `json:"filename"`
	Category string `json:"category"`
	Notes    string `json:"notes"`
}

func HandleCreateDocument(c *fiber.Ctx) error {
	var document Document

	if err := c.BodyParser(&document); err != nil {
		return c.Status(400).JSON(Message{Detail: err.Error()})
	}
	database.Database.Db.Create(&document)
	return c.Status(200).JSON(document)
}

func HandleFetchDocuments(c *fiber.Ctx) error {
	documents := []models.Document{}
	database.Database.Db.Preload(clause.Associations).Find(&documents)
	return c.Status(200).JSON(documents)
}

func HandleFetchEmployeeDocuments(c *fiber.Ctx) error {
	documents := []models.Document{}
	id, err := c.ParamsInt("id")
	if err != nil {
		c.Status(400).JSON(Message{Detail: "Missing Employee ID"})
	}
	database.Database.Db.Where("employee_refer= ?", id).Find(&documents)
	return c.Status(200).JSON(documents)
}

func HandleFetchDocumentDetails(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
	var item models.Document

	if err != nil {
		return c.Status(400).JSON(Message{Detail: "Id not provided!"})
	}

	if err := findDocumentById(id, &item); err != nil {
		return c.Status(404).JSON(Message{Detail: err.Error()})
	}

	return c.Status(200).JSON(item)
}

func HandleDeleteDocument(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
	if err != nil {
		return c.Status(400).JSON(Message{Detail: "Id not provided"})
	}
	var item models.Document

	if err := findDocumentById(id, &item); err != nil {
		return c.Status(404).JSON(Message{Detail: err.Error()})
	}
	if err := database.Database.Db.Delete(&item).Error; err != nil {
		return c.Status(500).JSON(Message{Detail: err.Error()})
	}

	return c.Status(200).JSON(Message{Detail: "Successfully deleted Leave Request"})

}

func findDocumentById(id int, document *models.Document) error {
	database.Database.Db.Find(&document, "id = ?", id)
	if document.ID == 0 {
		return errors.New("Item Not found!")
	}
	return nil
}
