package models

import "gorm.io/gorm"

type Department struct {
	gorm.Model
	Name      string `json:"name"`
	ShortName string `json:"short_name"`
}
