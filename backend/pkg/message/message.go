package message

type Message struct {
	ID        string `json:"id"`
	Content   string `json:"content"`
	CreatedAt string `json:"createdAt"`
}

func (m Message) AsItem() messageItem {
	return messageItem{
		Key:       NewKey(m.ID),
		Content:   m.Content,
		CreatedAt: m.CreatedAt,
	}
}

type messageItem struct {
	Key
	Content   string `json:"content"`
	CreatedAt string `json:"createdAt"`
}

func (mi messageItem) AsMessage() Message {
	return Message{
		ID:        mi.AsID(),
		Content:   mi.Content,
		CreatedAt: mi.CreatedAt,
	}
}
