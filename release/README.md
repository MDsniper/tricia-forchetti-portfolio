# Docker Deployment Package

This folder contains the complete static site and Docker configuration needed to run the portfolio in a container.

## Contents

- `Dockerfile`: builds an nginx-based image for the site.
- `docker-compose.yml`: optional compose launcher.
- `nginx.conf`: serves the static files on port `8080`.
- `index.html`: page entry point.
- `app.js`: transpiled browser-ready application script.
- `vendor/`: local React runtime files.
- `Tricia Forchetti.jpeg`: headshot used on the site.
- `release/`: minimal runtime-only handoff folder.

## Build

```bash
docker build -t tricia-forchetti-portfolio .
```

## Run

```bash
docker run --rm -p 8080:8080 tricia-forchetti-portfolio
```

Then open `http://localhost:8080`.

## Run With Compose

```bash
docker-compose up --build
```

## Runtime-Only Package

If you want the smallest handoff folder, use `release/`. It contains only the files required at runtime plus Docker configuration.