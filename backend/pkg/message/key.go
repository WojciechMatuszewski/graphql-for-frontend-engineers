package message

type Key struct {
	PK   string `json:"pk"`
	SK   string `json:"sk"`
	LSSK string `json:"lssk"`
}

func NewKey(createdAt string, ID string) Key {
	return Key{
		PK:   "MESSAGE",
		SK:   ID,
		LSSK: createdAt,
	}
}

func (k Key) AsCreatedAt() string {
	return k.LSSK
}

func (k Key) AsID() string {
	return k.SK
}
