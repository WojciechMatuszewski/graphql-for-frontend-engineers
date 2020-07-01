package gql

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"backend/pkg/gql/model"
	"backend/pkg/message"
)

func (r *mutationResolver) Message(ctx context.Context, input model.MessageInput) (*message.Message, error) {
	out, err := r.MessageStore.CreateMessage(ctx, input)
	return &out, err
}

func (r *queryResolver) Messages(ctx context.Context, limit *int) ([]message.Message, error) {
	return r.MessageStore.GetMessages(ctx, int64(*limit))
}

// Mutation returns MutationResolver implementation.
func (r *Resolver) Mutation() MutationResolver { return &mutationResolver{r} }

// Query returns QueryResolver implementation.
func (r *Resolver) Query() QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
