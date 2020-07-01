package main

import (
	"fmt"
	"log"
	"net/http"

	"backend/pkg/gql"

	"github.com/99designs/gqlgen/graphql/handler"
)

func main() {
	port := "4000"

	srv := handler.NewDefaultServer(gql.NewExecutableSchema(gql.Config{Resolvers: &gql.Resolver{}}))
	http.Handle("/graphql", srv)

	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%v", port), nil))
}
