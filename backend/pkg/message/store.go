package message

import (
	"context"
	"time"

	"backend/pkg/gql/model"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/dynamodbattribute"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/dynamodbiface"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/expression"
	"github.com/google/uuid"
)

type Store struct {
	db    dynamodbiface.ClientAPI
	table string
}

func NewStore(db dynamodbiface.ClientAPI, table string) Store {
	return Store{db: db, table: table}
}

func (s Store) CreateMessage(ctx context.Context, input model.MessageInput) (Message, error) {
	msg := Message{
		ID:        uuid.Must(uuid.NewRandom()).String(),
		Content:   input.Content,
		CreatedAt: time.Now().Format(time.RFC3339),
	}
	msgItem := msg.AsItem()

	dbItem, err := dynamodbattribute.MarshalMap(&msgItem)
	if err != nil {
		return Message{}, err
	}

	req := s.db.PutItemRequest(&dynamodb.PutItemInput{
		Item:      dbItem,
		TableName: aws.String(s.table),
	})
	_, err = req.Send(ctx)

	return msg, err
}

func (s Store) GetMessages(ctx context.Context, limit int64) ([]Message, error) {
	key := NewKey("")
	keyCond := expression.Key("pk").Equal(expression.Value(key.PK))
	expr, err := expression.NewBuilder().WithKeyCondition(keyCond).Build()
	if err != nil {
		return nil, err
	}

	req := s.db.QueryRequest(&dynamodb.QueryInput{
		ExpressionAttributeNames:  expr.Names(),
		ExpressionAttributeValues: expr.Values(),
		KeyConditionExpression:    expr.KeyCondition(),
		TableName:                 aws.String(s.table),
		Limit:                     aws.Int64(limit),
	})

	out, err := req.Send(ctx)
	if err != nil {
		return nil, err
	}

	mItems := make([]messageItem, len(out.Items))
	err = dynamodbattribute.UnmarshalListOfMaps(out.Items, &mItems)
	if err != nil {
		return nil, err
	}

	messages := make([]Message, len(mItems))
	for i, mItem := range mItems {
		messages[i] = mItem.AsMessage()
	}

	return messages, nil
}
