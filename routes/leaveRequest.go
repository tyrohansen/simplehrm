package routes

import (
	"errors"
	"log"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/tyrohansen/simplehrm/database"
	"github.com/tyrohansen/simplehrm/models"
)

type LeaveRequest struct {
	EmployeeRefer int       `json:"department_id"`
	StartDate     time.Time `json:"start_date"`
	Enddate       time.Time `json:"end_date"`
	WorkDays      int       `json:"work_days"`
	Reason        string    `json:"reason"`
	Status        string    `json:"status"`
	Comment       string    `json:"comment"`
}

func HandleCreateLeaveRequest(c *fiber.Ctx) error {
	var request models.LeaveRequest

	if err := c.BodyParser(&request); err != nil {
		return c.Status(400).JSON(fiber.Map{"message": err.Error()})
	}
	database.Database.Db.Create(&request)
	return c.Status(200).JSON(request)
}

func HandleGetLeaveRequests(c *fiber.Ctx) error {
	items := []models.LeaveRequest{}
	database.Database.Db.Find(&items)
	return c.Status(200).JSON(items)
}

func HandleGetEmployeeLeaveRequests(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")

	if err != nil {
		log.Panic(err.Error())
		return c.Status(400).JSON(Message{Detail: "No Employee id provided!"})
	}
	items := []models.LeaveRequest{}
	database.Database.Db.Where("employee_refer= ?", id).Find(&items)
	return c.Status(200).JSON(items)
}

func findLeaveById(id int, item *models.LeaveRequest) error {
	database.Database.Db.Find(&item, "id = ?", id)
	if item.ID == 0 {
		return errors.New("Item Not found!")
	}
	return nil
}

func HandleGetLeaveRequestDetails(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
	var item models.LeaveRequest

	if err != nil {
		return c.Status(400).JSON(Message{Detail: "Id not provided!"})
	}

	if err := findLeaveById(id, &item); err != nil {
		return c.Status(404).JSON(Message{Detail: err.Error()})
	}

	return c.Status(200).JSON(item)
}

func HandleUpdateLeaveRequest(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
	if err != nil {
		return c.Status(400).JSON(Message{Detail: "Id not provided"})
	}
	var item models.LeaveRequest

	if err := findLeaveById(id, &item); err != nil {
		return c.Status(404).JSON(Message{Detail: err.Error()})
	}

	var form LeaveRequest
	if err := c.BodyParser(&form); err != nil {
		return c.Status(400).JSON(Message{Detail: err.Error()})
	}
	item.Reason = form.Reason
	database.Database.Db.Save(&item)
	return c.Status(200).JSON(item)
}

func HandleDeleteLeaveRequest(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
	if err != nil {
		return c.Status(400).JSON(Message{Detail: "Id not provided"})
	}
	var item models.LeaveRequest

	if err := findLeaveById(id, &item); err != nil {
		return c.Status(404).JSON(Message{Detail: err.Error()})
	}
	if err := database.Database.Db.Delete(&item).Error; err != nil {
		return c.Status(500).JSON(Message{Detail: err.Error()})
	}

	return c.Status(200).JSON(Message{Detail: "Successfully deleted Leave Request"})
}
