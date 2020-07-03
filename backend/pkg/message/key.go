package message

type Key struct {
	PK string `json:"pk"`
	SK string `json:"sk"`
}

func NewKey(ID string) Key {
	return Key{
		PK: "MESSAGE",
		SK: ID,
	}
}

func (k Key) AsID() string {
	return k.SK
}
