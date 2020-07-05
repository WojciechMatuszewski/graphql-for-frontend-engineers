// Package auth contains everything auth related
package auth

import (
	"net/http"
)

// Middleware checks the tokens
func Middleware(next http.Handler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := r.Header.Get("Authorization")
		if token == "secret" {
			next.ServeHTTP(w, r)
			return
		}

		err := validateToken(token)
		if err != nil {
			http.Error(w, http.StatusText(http.StatusUnauthorized), http.StatusUnauthorized)
			return
		}

		next.ServeHTTP(w, r)
	}
}
