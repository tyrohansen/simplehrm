package database

import (
	"log"
	"os"

	"github.com/tyrohansen/simplehrm/models"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

type DbInstance struct {
	Db *gorm.DB
}

var Database DbInstance

func ConnectDb() {
	db, err := gorm.Open(sqlite.Open("simplehrm.sqlite3"), &gorm.Config{})

	if err != nil {
		log.Fatal("Failed to connect to the database! \n", err)
		os.Exit(2)
	}

	log.Println("Connected Successfully to Database")
	//db.Logger = logger.Default.LogMode(logger.Info)
	db.Logger = logger.Default.LogMode(logger.Warn)
	log.Println("Running Migrations")

	db.AutoMigrate(&models.Department{}, &models.Employee{}, &models.LeaveRequest{}, &models.Document{})

	Database = DbInstance{
		Db: db,
	}
}
