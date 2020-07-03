package message

import (
	"context"
	"fmt"

	"backend/pkg/gql/model"

	"github.com/bxcodec/faker/v3"
)

func (s Store) Seed() {
	for _, msg := range getMessages() {
		_, err := s.CreateMessage(context.Background(), model.MessageInput{Content: msg})
		if err != nil {
			panic(fmt.Sprintf("Seeding messages not successful! %v", err.Error()))
		}
	}
}

func getMessages() []string {
	messages := make([]string, 50)
	for i := 0; i < len(messages); i++ {
		messages[i] = faker.Sentence()
	}

	return messages
}
