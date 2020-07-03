package gql

import (
	"backend/pkg/message"
	"backend/pkg/user"
)

//go:generate go run github.com/99designs/gqlgen generate

type Resolver struct {
	MessageStore message.Store
	UserStore    user.Store
}
