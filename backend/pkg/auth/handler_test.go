package auth_test

import (
	"backend/pkg/auth"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestHandler(t *testing.T) {
	t.Run("rejects non GET methods", func(t *testing.T) {
		req := httptest.NewRequest("POST", "/", nil)
		rec := httptest.NewRecorder()

		auth.GetTokenHandler(auth.NewToken).ServeHTTP(rec, req)
		assert.Equal(t, http.StatusMethodNotAllowed, rec.Result().StatusCode)
	})

	t.Run("returns the token as a response", func(t *testing.T) {
		req := httptest.NewRequest("GET", "/", nil)
		rec := httptest.NewRecorder()

		tokenIssuer := func(exp int64) (string, error) {
			return "token", nil
		}

		auth.GetTokenHandler(tokenIssuer).ServeHTTP(rec, req)

		resp := rec.Result()
		body, _ := ioutil.ReadAll(resp.Body)
		token := strings.TrimSuffix(string(body), "\n")

		assert.Equal(t, http.StatusOK, rec.Result().StatusCode)
		assert.Equal(t, `{"token":"token"}`, token, nil)
	})
}
