FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html /usr/share/nginx/html/index.html
COPY app.js /usr/share/nginx/html/app.js
COPY ["Tricia Forchetti.jpeg", "/usr/share/nginx/html/Tricia Forchetti.jpeg"]
COPY vendor /usr/share/nginx/html/vendor

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]