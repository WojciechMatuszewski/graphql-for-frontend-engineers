FROM golang:1.13-alpine as builder

ENV GO111MODULE=on \
    CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64

RUN mkdir /build

RUN ls

WORKDIR /build

COPY go.mod .
COPY go.sum .

RUN go mod download

COPY . .

RUN go build -o main /build

FROM alpine:3.12.0

COPY --from=builder /build/main .

RUN ls

EXPOSE 4000

CMD ["/main"]

