package user

import (
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
)

type Key struct {
	PK string `json:"pk"`
	SK string `json:"sk"`
}

func NewKey(ID string) Key {
	return Key{
		PK: "USER",
		SK: ID,
	}
}

func (k Key) AsID() string {
	return k.SK
}

func (k Key) AsAttrs() map[string]dynamodb.AttributeValue {
	return map[string]dynamodb.AttributeValue{
		"pk": {
			S: aws.String(k.PK),
		},
		"sk": {
			S: aws.String(k.SK),
		},
	}
}
