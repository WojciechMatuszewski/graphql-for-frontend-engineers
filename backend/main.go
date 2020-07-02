package main

import (
	"fmt"
	"log"
	"net/http"

	"backend/pkg/db"
	"backend/pkg/gql"
	"backend/pkg/message"

	"github.com/rs/cors"

	"github.com/99designs/gqlgen/graphql/playground"

	"github.com/99designs/gqlgen/graphql/handler"
)

func main() {
	port := "4000"

	d, err := db.New(db.DBDefaultEndpoint, db.DBDefaultTableName)
	if err != nil {
		panic(err.Error())
	}

	msgStore := message.NewStore(d, db.DBDefaultTableName)
	srv := handler.NewDefaultServer(gql.NewExecutableSchema(gql.Config{Resolvers: &gql.Resolver{
		MessageStore: msgStore,
	}}))

	mux := http.NewServeMux()

	mux.Handle("/graphql", srv)
	mux.Handle("/playground",
		playground.Handler("GraphQL playground", "/graphql"))

	cHandler := cors.Default().Handler(mux)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%v", port), cHandler))
}
