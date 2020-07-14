package main

import (
	"fmt"
	"log"
	"net/http"

	"backend/pkg/auth"
	"backend/pkg/db"
	"backend/pkg/gql"
	"backend/pkg/message"
	"backend/pkg/user"

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
	msgStore.Seed()

	usrStore := user.NewStore(d, db.DBDefaultTableName)
	usrStore.Seed()

	srv := handler.NewDefaultServer(gql.NewExecutableSchema(gql.Config{Resolvers: &gql.Resolver{
		MessageStore: msgStore,
		UserStore:    usrStore,
	}}))

	mux := http.NewServeMux()
	mux.Handle("/get-token", auth.GetTokenHandler(auth.IssueToken))

	// workshop will be using this route
	mux.Handle("/graphql", auth.Middleware(srv))

	// disable authentication for this specific route
	mux.Handle("/graphql-playground", srv)

	mux.Handle("/playground",
		playground.Handler("GraphQL playground", "/graphql-playground"))

	cHandler := cors.AllowAll().Handler(mux)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%v", port), cHandler))
}
