package data

import (
	"context"
	"database/sql"
	"time"
)

type DataModel struct {
	DB *sql.DB
}

func (m DataModel) AddTest(text string) error {
	sqlQuery := `
INSERT INTO test(test)
VALUES(?)
	`
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	m.DB.QueryContext(ctx, sqlQuery, text)

	return nil
}

func (m DataModel) GetTests() ([]string, error) {
	sqlQuery := `
SELECT test FROM test 
	`
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	rows, err := m.DB.QueryContext(ctx, sqlQuery)
	if err != nil {
		return []string{}, err
	}
	defer rows.Close()

	var tests []string
	for rows.Next() {
		var test string
		err = rows.Scan(&test)
		if err != nil {
			return []string{}, err
		}

		tests = append(tests, test)
	}
	if rows.Err() != nil {
		return []string{}, err
	}

	return tests, nil
}
