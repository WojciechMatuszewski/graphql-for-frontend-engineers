package auth

import (
	"github.com/dgrijalva/jwt-go"
)

const tokenSecret = "secret"

// IssueToken creates new token
func IssueToken(exp int64) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		ExpiresAt: exp,
	})
	return token.SignedString([]byte(tokenSecret))
}

// ValidateToken validates the token
func validateToken(token string) error {
	_, err := jwt.Parse(token, func(t *jwt.Token) (interface{}, error) {
		return []byte(tokenSecret), nil
	})
	return err
}
