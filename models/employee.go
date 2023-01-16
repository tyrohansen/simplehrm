package models

import "gorm.io/gorm"

type Employee struct {
	gorm.Model
	FirstName       string     `json:"first_name"`
	LastName        string     `json:"last_name"`
	Gender          string     `json:"gender"`
	DepartmentRefer int        `json:"department_id"`
	Department      Department `gorm:"foreignKey:DepartmentRefer"`
	JobTitle        string     `json:"job_title"`
	Section         string     `json:"section"`
	IdNo            string     `json:"id_no"`
	Nin             string     `json:"nin"`
	DateJoined      string     `json:"date_joined"`
	MaritalStatus   string     `json:"marital_status"`
	BirthPlace      string     `json:"birth_place"`
	Residence       string     `json:"residence"`
	Dob             string     `json:"date_of_birth"`
	KinName         string     `json:"kin_name"`
	KinContact      string     `json:"kin_contact"`
	Photo           string     `json:"photo"`
	EContact        string     `json:"emergency_contact"`
	Comment         string     `json:"comment" gorm:"type:text"`
}
