package user

import (
	"context"
	"strings"

	"backend/pkg/gql/model"

	"github.com/aws/aws-sdk-go-v2/service/dynamodb/expression"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/dynamodbattribute"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/dynamodbiface"
)

// this will be used only for workshop-purposes, no need to get fancy here.
const userID = "1"

type Store struct {
	db    dynamodbiface.ClientAPI
	table string
}

func NewStore(db dynamodbiface.ClientAPI, table string) Store {
	return Store{
		db:    db,
		table: table,
	}
}

func (s Store) GetUser(ctx context.Context) (User, error) {
	key := NewKey(userID)

	req := s.db.GetItemRequest(&dynamodb.GetItemInput{
		Key:       key.AsAttrs(),
		TableName: aws.String(s.table),
	})

	out, err := req.Send(ctx)
	if err != nil {
		return User{}, err
	}

	var uItem userItem
	err = dynamodbattribute.UnmarshalMap(out.Item, &uItem)
	if err != nil {
		return User{}, err
	}

	return uItem.AsUser(), nil
}

func (s Store) UpdateUser(ctx context.Context, input model.UpdateUserInput) (User, error) {
	key := NewKey(userID)

	var updateExpr expression.UpdateBuilder
	if input.Hobbies != nil {
		updateExpr = updateExpr.Set(expression.Name("hobbies"), expression.Value(input.Hobbies))
	}
	if input.FirstName != nil {
		updateExpr = updateExpr.Set(expression.Name("firstName"), expression.Value(input.FirstName))
	}
	if input.LastName != nil {
		updateExpr = updateExpr.Set(expression.Name("lastName"), expression.Value(input.LastName))
	}

	expr, err := expression.NewBuilder().WithUpdate(updateExpr).Build()
	if err != nil {
		// no idea how to check it other way
		if strings.Contains(err.Error(), "unset parameter") {
			return s.GetUser(ctx)
		}
		return User{}, err
	}

	req := s.db.UpdateItemRequest(&dynamodb.UpdateItemInput{
		ExpressionAttributeNames:  expr.Names(),
		ExpressionAttributeValues: expr.Values(),
		Key:                       key.AsAttrs(),
		ReturnValues:              dynamodb.ReturnValueAllNew,
		TableName:                 aws.String(s.table),
		UpdateExpression:          expr.Update(),
	})

	out, err := req.Send(ctx)
	if err != nil {
		return User{}, err
	}

	var usrItem userItem
	err = dynamodbattribute.UnmarshalMap(out.Attributes, &usrItem)
	if err != nil {
		return User{}, err
	}

	return usrItem.AsUser(), nil
}

func (s Store) createUser(ctx context.Context, user User) error {
	usrItem := user.AsItem()
	dbItem, err := dynamodbattribute.MarshalMap(usrItem)

	req := s.db.PutItemRequest(&dynamodb.PutItemInput{
		Item:      dbItem,
		TableName: aws.String(s.table),
	})

	_, err = req.Send(ctx)
	return err
}
