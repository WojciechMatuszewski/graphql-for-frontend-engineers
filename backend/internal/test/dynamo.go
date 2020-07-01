package test

import (
	"context"
	"testing"

	"backend/pkg/db"

	"github.com/aws/aws-sdk-go-v2/aws"

	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/docker/go-connections/nat"
	"github.com/testcontainers/testcontainers-go"
	"github.com/testcontainers/testcontainers-go/wait"
)

var container testcontainers.Container

func init() {
	if container != nil {
		return
	}

	dynamoC, err := getTestContainer()
	if err != nil {
		panic(err.Error())
	}

	container = dynamoC
}

type DB struct {
	Client *dynamodb.Client
	table  string
}

func NewDB(t *testing.T) (DB, error) {
	t.Helper()

	endpoint, err := container.Endpoint(context.Background(), "http")
	if err != nil {
		t.Fatal(err)
	}

	d, err := db.New(endpoint, "")
	if err != nil {
		t.Fatal(err)
	}

	return DB{
		Client: d,
		table:  "",
	}, nil

}

func (d DB) Cleanup(t *testing.T) {
	t.Helper()
	req := d.Client.DeleteTableRequest(&dynamodb.DeleteTableInput{
		TableName: aws.String(d.table),
	})

	_, err := req.Send(context.Background())
	if err != nil {
		t.Fatal(err)
	}
}

func getTestContainer() (testcontainers.Container, error) {
	ctx := context.Background()

	port, err := nat.NewPort("tcp", "8000")
	if err != nil {
		return nil, err
	}

	req := testcontainers.ContainerRequest{
		Image:        "amazon/dynamodb-local",
		ExposedPorts: []string{"8000/tcp"},
		WaitingFor:   wait.ForListeningPort(port),
	}

	dynamoC, err := testcontainers.GenericContainer(ctx, testcontainers.GenericContainerRequest{
		ContainerRequest: req,
		Started:          true,
	})
	return dynamoC, err
}
