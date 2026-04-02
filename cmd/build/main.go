package main

import (
	"html/template"
	"io"
	"log"
	"os"
	"path/filepath"

	"tricia-forchetti-portfolio/site"
)

func main() {
	tmpl := template.Must(template.New("index.html").Funcs(site.FuncMap()).ParseFiles("templates/index.html"))
	data := site.Data()

	os.MkdirAll("dist/static", 0o755)

	f, err := os.Create("dist/index.html")
	if err != nil {
		log.Fatal(err)
	}
	defer f.Close()

	if err := tmpl.Execute(f, data); err != nil {
		log.Fatal(err)
	}

	copyStaticFiles("static", "dist/static")

	log.Println("Built dist/index.html")
}

func copyStaticFiles(src, dst string) {
	entries, err := os.ReadDir(src)
	if err != nil {
		log.Fatal(err)
	}
	for _, entry := range entries {
		if entry.IsDir() {
			continue
		}
		srcPath := filepath.Join(src, entry.Name())
		dstPath := filepath.Join(dst, entry.Name())

		in, err := os.Open(srcPath)
		if err != nil {
			log.Fatal(err)
		}
		out, err := os.Create(dstPath)
		if err != nil {
			in.Close()
			log.Fatal(err)
		}
		io.Copy(out, in)
		in.Close()
		out.Close()
	}
}
