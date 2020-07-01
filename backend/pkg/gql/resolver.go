package gql

import "backend/pkg/message"

//go:generate go run github.com/99designs/gqlgen generate

type Resolver struct{ MessageStore message.Store }
