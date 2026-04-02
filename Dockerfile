FROM golang:1.23-alpine AS build

WORKDIR /app
COPY go.mod ./
COPY main.go ./
COPY templates/ ./templates/
COPY static/ ./static/

RUN CGO_ENABLED=0 go build -o server .

FROM alpine:3.20

WORKDIR /app
COPY --from=build /app/server .

EXPOSE 8080

CMD ["./server"]
