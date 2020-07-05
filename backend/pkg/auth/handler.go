package auth

import (
	"encoding/json"
	"net/http"
	"time"
)

// TokenGetterHandler is the handler
type TokenGetterHandler http.Handler

// Response is the data returned from the handler
type Response struct {
	Token string `json:"token"`
}

// GetTokenHandler returns a new token
func GetTokenHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != "GET" {
			http.Error(w, http.StatusText(http.StatusMethodNotAllowed),
				http.StatusMethodNotAllowed)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		t, err := newToken(time.Now().Add(10 * time.Second).Unix())
		if err != nil {
			http.Error(w, http.StatusText(http.StatusInternalServerError),
				http.StatusInternalServerError)
			return
		}

		err = json.NewEncoder(w).Encode(Response{Token: t})
		if err != nil {
			http.Error(w, http.StatusText(http.StatusInternalServerError),
				http.StatusInternalServerError)
			return
		}
	}
}
