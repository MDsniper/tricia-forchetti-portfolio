package main

import (
	"embed"
	"html/template"
	"log"
	"net/http"
	"strconv"

	"tricia-forchetti-portfolio/site"
)

//go:embed templates/*.html
var templateFS embed.FS

//go:embed static/*
var staticFS embed.FS

func main() {
	tmpl := template.Must(template.New("index.html").Funcs(site.FuncMap()).ParseFS(templateFS, "templates/index.html"))
	data := site.Data()

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/" {
			http.NotFound(w, r)
			return
		}
		w.Header().Set("Content-Type", "text/html; charset=utf-8")
		if err := tmpl.Execute(w, data); err != nil {
			log.Printf("template error: %v", err)
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		}
	})

	http.Handle("/static/", http.FileServerFS(staticFS))

	port := 8080
	log.Printf("Listening on :%d", port)
	if err := http.ListenAndServe(":"+strconv.Itoa(port), nil); err != nil {
		log.Fatal(err)
	}
}
