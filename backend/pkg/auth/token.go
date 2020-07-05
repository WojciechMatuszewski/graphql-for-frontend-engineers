package auth

import (
	"github.com/dgrijalva/jwt-go"
)

const tokenSecret = "secret"

// ValidateToken validates the token
func validateToken(token string) error {
	_, err := jwt.Parse(token, func(t *jwt.Token) (interface{}, error) {
		return tokenSecret, nil
	})
	return err
}

// NewToken creates new token
func newToken(exp int64) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodES256, jwt.StandardClaims{
		ExpiresAt: exp,
	})
	return token.SignedString([]byte(tokenSecret))
}
