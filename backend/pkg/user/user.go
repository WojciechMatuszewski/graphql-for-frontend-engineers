package user

type User struct {
	FirstName string   `json:"firstName"`
	LastName  string   `json:"lastName"`
	ID        string   `json:"id"`
	Hobbies   []string `json:"hobbies"`
}

func (u User) AsItem() userItem {
	return userItem{
		Key:       NewKey(u.ID),
		FirstName: u.FirstName,
		LastName:  u.LastName,
		Hobbies:   u.Hobbies,
	}
}

type userItem struct {
	Key
	FirstName string   `json:"firstName"`
	LastName  string   `json:"lastName"`
	Hobbies   []string `json:"hobbies"`
}

func (ui userItem) AsUser() User {
	return User{
		FirstName: ui.FirstName,
		LastName:  ui.LastName,
		ID:        ui.AsID(),
		Hobbies:   ui.Hobbies,
	}
}
