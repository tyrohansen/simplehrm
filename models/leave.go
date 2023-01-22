package models

import (
	"time"

	"gorm.io/gorm"
)

type MyTime struct {
	time.Time
}

func (m *MyTime) UnmarshalJSON(data []byte) error {
	// Ignore null, like in the main JSON package.
	if string(data) == "null" || string(data) == `""` {
		return nil
	}
	// Fractional seconds are handled implicitly by Parse.
	tt, err := time.Parse(`"`+time.RFC3339+`"`, string(data))
	*m = MyTime{tt}
	return err
}

type LeaveRequest struct {
	gorm.Model
	EmployeeRefer int       `json:"employee_id"`
	Employee      Employee  `gorm:"foreignKey:EmployeeRefer"`
	StartDate     time.Time `json:"start_date"`
	Enddate       time.Time `json:"end_date"`
	WorkDays      int       `json:"work_days"`
	Reason        string    `json:"reason"`
	Status        string    `json:"status"`
	Comment       string    `json:"comment"`
	ApprovedOn    time.Time `json:"approved_on"`
}
