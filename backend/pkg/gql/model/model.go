// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

type MessageInput struct {
	Content string `json:"content"`
}

type UpdateUserInput struct {
	FirstName *string  `json:"firstName"`
	LastName  *string  `json:"lastName"`
	Hobbies   []string `json:"hobbies"`
}
