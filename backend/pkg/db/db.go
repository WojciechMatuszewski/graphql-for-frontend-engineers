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
	cfg, err := external.LoadDefaultAWSConfig(aws.StaticCredentialsProvider{Value: aws.Credentials{
		SecretAccessKey: "local",
		SessionToken:    "local",
		Source:          "local",
		CanExpire:       false,
	}})
	if err != nil {
		panic(err.Error())
	}

	cfg.Region = "local"
	cfg.EndpointResolver = aws.ResolveWithEndpointURL(endpoint)

	return cfg
}

func getTableInput(tableName string) *dynamodb.CreateTableInput {
	return &dynamodb.CreateTableInput{
		AttributeDefinitions: []dynamodb.AttributeDefinition{
			{AttributeType: dynamodb.ScalarAttributeTypeS, AttributeName: aws.String("pk")},
			{AttributeType: dynamodb.ScalarAttributeTypeS, AttributeName: aws.String("sk")},
			{AttributeType: dynamodb.ScalarAttributeTypeS, AttributeName: aws.String("lssk")},
		},
		BillingMode: dynamodb.BillingModePayPerRequest,
		KeySchema: []dynamodb.KeySchemaElement{
			{KeyType: "HASH", AttributeName: aws.String("pk")},
			{KeyType: "RANGE", AttributeName: aws.String("sk")},
		},
		LocalSecondaryIndexes: []dynamodb.LocalSecondaryIndex{
			{
				IndexName: aws.String("ByCreatedAt"),
				KeySchema: []dynamodb.KeySchemaElement{
					{KeyType: "HASH", AttributeName: aws.String("pk")},
					{KeyType: "RANGE", AttributeName: aws.String("lssk")},
				},
				Projection: &dynamodb.Projection{
					ProjectionType: dynamodb.ProjectionTypeAll,
				},
			},
		},
		TableName: aws.String(tableName),
	}
}
