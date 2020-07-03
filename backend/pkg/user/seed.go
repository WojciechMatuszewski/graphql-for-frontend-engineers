package user

import "context"

func (s Store) Seed() {
	usr := User{
		FirstName: "User First Name",
		LastName:  "User Last Name",
		ID:        userID,
		Hobbies:   []string{"GraphQL"},
	}

	err := s.createUser(context.Background(), usr)
	if err != nil {
		panic("Could not seed user")
	}
}
