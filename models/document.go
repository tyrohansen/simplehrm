package models

import "gorm.io/gorm"

type Document struct {
	gorm.Model
	Title         string   `json:"title"`
	EmployeeRefer int      `json:"employee_id"`
	Employee      Employee `gorm:"foreignKey:EmployeeRefer"`
	Filename      string   `json:"filename"`
	Category      string   `json:"category"`
	Notes         string   `json:"notes"`
}
