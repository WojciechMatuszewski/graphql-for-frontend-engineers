package auth_test

import (
	"backend/pkg/auth"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestMiddleware(t *testing.T) {
	t.Run("when authorization is not set", func(t *testing.T) {
		req := httptest.NewRequest("POST", "/", nil)
		rec := httptest.NewRecorder()

		nextCalled := false
		nextHandler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			nextCalled = true
		})
		auth.Middleware(nextHandler).ServeHTTP(rec, req)

		assert.False(t, nextCalled)
		assert.Equal(t, http.StatusUnauthorized, rec.Result().StatusCode)
	})

	t.Run("when authorization is set to `secret`", func(t *testing.T) {
		req := httptest.NewRequest("POST", "/", nil)
		rec := httptest.NewRecorder()
		req.Header.Set("Authorization", "secret")

		nextCalled := false
		nextHandler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			nextCalled = true
		})
		auth.Middleware(nextHandler).ServeHTTP(rec, req)

		assert.True(t, nextCalled)
		assert.Equal(t, http.StatusOK, rec.Result().StatusCode)
	})

	t.Run("when token is expired", func(t *testing.T) {
		req := httptest.NewRequest("POST", "/", nil)
		rec := httptest.NewRecorder()

		exp := time.Now().Add(-1 * time.Second).Unix()
		token, err := auth.IssueToken(exp)
		if err != nil {
			t.Fatal(err.Error())
		}
		rec.Header().Set("Authorization", token)

		nextCalled := false
		nextHandler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			nextCalled = true
		})
		auth.Middleware(nextHandler).ServeHTTP(rec, req)

		assert.False(t, nextCalled)
		assert.Equal(t, http.StatusUnauthorized, rec.Result().StatusCode)
	})

	t.Run("with valid token", func(t *testing.T) {
		req := httptest.NewRequest("POST", "/", nil)
		rec := httptest.NewRecorder()

		exp := time.Now().Add(30 * time.Second).Unix()
		token, err := auth.IssueToken(exp)
		if err != nil {
			t.Fatal(err.Error())
		}
		req.Header.Set("Authorization", token)

		nextCalled := false
		nextHandler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			nextCalled = true
		})
		auth.Middleware(nextHandler).ServeHTTP(rec, req)

		assert.True(t, nextCalled)
		assert.Equal(t, http.StatusOK, rec.Result().StatusCode)
	})
}
