package db

import (
	"context"
	"strings"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/aws/external"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
)

const (
	DBDefaultTableName = "workshop-table"
	DBDefaultEndpoint  = "http://dynamodb:8000"
)

func New(endpoint string, tableName string) (*dynamodb.Client, error) {
	cfg := NewConfig(endpoint)
	db := dynamodb.New(cfg)

	err := createTable(db, tableName)
	if err == nil {
		return db, nil
	}

	if !strings.Contains(err.Error(), dynamodb.ErrCodeResourceInUseException) {
		return nil, err
	}

	err = reinitializeTable(db, tableName)
	if err != nil {
		return nil, err
	}

	return db, nil
}

func NewConfig(endpoint string) aws.Config {
	cfg, err := external.LoadDefaultAWSConfig()
	if err != nil {
		panic(err.Error())
	}

	cfg.Credentials = aws.StaticCredentialsProvider{Value: aws.Credentials{
		AccessKeyID:     "local",
		SecretAccessKey: "local",
		SessionToken:    "local",
		Source:          "local",
		CanExpire:       false,
	}}
	cfg.Region = "eu-central-1"
	cfg.EndpointResolver = aws.ResolveWithEndpointURL(endpoint)

	return cfg
}

func getTableInput(tableName string) *dynamodb.CreateTableInput {
	return &dynamodb.CreateTableInput{
		AttributeDefinitions: []dynamodb.AttributeDefinition{
			{AttributeType: dynamodb.ScalarAttributeTypeS, AttributeName: aws.String("pk")},
			{AttributeType: dynamodb.ScalarAttributeTypeS, AttributeName: aws.String("sk")},
			{AttributeType: dynamodb.ScalarAttributeTypeS, AttributeName: aws.String("createdAt")},
		},
		BillingMode: dynamodb.BillingModePayPerRequest,
		KeySchema: []dynamodb.KeySchemaElement{
			{KeyType: "HASH", AttributeName: aws.String("pk")},
			{KeyType: "RANGE", AttributeName: aws.String("sk")},
		},
		GlobalSecondaryIndexes: []dynamodb.GlobalSecondaryIndex{
			{
				IndexName: aws.String("ByCreatedAt"),
				KeySchema: []dynamodb.KeySchemaElement{
					{
						KeyType: "HASH", AttributeName: aws.String("pk"),
					},
					{
						KeyType: "RANGE", AttributeName: aws.String("createdAt"),
					},
				},
				Projection: &dynamodb.Projection{
					ProjectionType: dynamodb.ProjectionTypeAll,
				},
			},
		},
		TableName: aws.String(tableName),
	}
}

func createTable(db *dynamodb.Client, tableName string) error {
	req := db.CreateTableRequest(getTableInput(tableName))
	_, err := req.Send(context.Background())
	return err
}

func deleteTable(db *dynamodb.Client, tableName string) error {
	req := db.DeleteTableRequest(&dynamodb.DeleteTableInput{TableName: aws.String(tableName)})
	_, err := req.Send(context.Background())
	return err
}

func reinitializeTable(db *dynamodb.Client, tableName string) error {
	err := deleteTable(db, tableName)
	if err != nil {
		return err
	}

	err = createTable(db, tableName)
	return err
}
