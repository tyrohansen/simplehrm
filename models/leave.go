package models

import (
	"time"

	"gorm.io/gorm"
)

type LeaveRequest struct {
	gorm.Model
	EmployeeRefer int       `json:"department_id"`
	Employee      Employee  `gorm:"foreignKey:EmployeeRefer"`
	StartDate     time.Time `json:"start_date"`
	Enddate       time.Time `json:"end_date"`
	WorkDays      int       `json:"work_days"`
	Reason        string    `json:"reason"`
	Status        string    `json:"status"`
	Comment       string    `json:"comment"`
	ApprovedOn    time.Time `json:"approved_on"`
}
