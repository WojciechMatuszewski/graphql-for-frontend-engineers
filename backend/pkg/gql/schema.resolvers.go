package gql

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"backend/pkg/message"
	"context"
	"fmt"
)

func (r *queryResolver) Messages(ctx context.Context) ([]*message.Message, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Foo(ctx context.Context) (string, error) {
	return "bar", nil
}

// Query returns QueryResolver implementation.
func (r *Resolver) Query() QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *Resolver }
