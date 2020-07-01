package message_test

import (
	"context"
	"fmt"
	"testing"

	"backend/internal/test"
	_ "backend/internal/test"
	"backend/pkg/message"
)

func TestStore(t *testing.T) {

	t.Run("GetMessages", func(t *testing.T) {
		testDB := test.NewDB(t)
		store := message.NewStore(testDB.Client, testDB.Table)
		out, err := store.GetMessages(context.Background())
		fmt.Println(out, err)
	})
}
