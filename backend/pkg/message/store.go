package message

import (
	"context"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/dynamodbattribute"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/dynamodbiface"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/expression"
)

type Store struct {
	db    dynamodbiface.ClientAPI
	table string
}

func NewStore(db dynamodbiface.ClientAPI, table string) Store {
	return Store{db: db, table: table}
}

func (s Store) GetMessages(ctx context.Context) ([]Message, error) {
	key := NewKey("", "")
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
