package db

import (
	"context"
	"time"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/aws/external"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
)

const DBDefaultTableName = "workshop-table"

func New(endpoint string, tableName string) (*dynamodb.Client, error) {
	cfg := NewConfig(endpoint)
	db := dynamodb.New(cfg)

	ctx, cancel := context.WithDeadline(context.Background(), time.Now().Add(5*time.Second))
	defer cancel()

	req := db.CreateTableRequest(getTableInput(tableName))
	_, err := req.Send(ctx)
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

	cfg.Region = "local"
	cfg.Credentials = aws.StaticCredentialsProvider{Value: aws.Credentials{
		SecretAccessKey: "local",
		SessionToken:    "local",
		Source:          "local",
		CanExpire:       false,
	}}
	cfg.EndpointResolver = aws.ResolveWithEndpointURL(endpoint)

	return cfg
}

func getTableInput(tableName string) *dynamodb.CreateTableInput {
	return &dynamodb.CreateTableInput{
		AttributeDefinitions: []dynamodb.AttributeDefinition{
			{AttributeType: dynamodb.ScalarAttributeTypeS, AttributeName: aws.String("PK")},
			{AttributeType: dynamodb.ScalarAttributeTypeS, AttributeName: aws.String("SK")},
		},
		BillingMode: dynamodb.BillingModePayPerRequest,
		KeySchema: []dynamodb.KeySchemaElement{
			{KeyType: "HASH", AttributeName: aws.String("PK")},
			{KeyType: "RANGE", AttributeName: aws.String("SK")},
		},
		LocalSecondaryIndexes: []dynamodb.LocalSecondaryIndex{
			{
				IndexName: aws.String("ByCreatedAt"),
				KeySchema: []dynamodb.KeySchemaElement{
					{KeyType: "HASH", AttributeName: aws.String("PK")},
					{KeyType: "RANGE", AttributeName: aws.String("LSSK")},
				},
				Projection: &dynamodb.Projection{
					ProjectionType: dynamodb.ProjectionTypeAll,
				},
			},
		},
		TableName: aws.String(tableName),
	}
}
