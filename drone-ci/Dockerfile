FROM nginx:stable-alpine
COPY dist/cms-login /usr/share/nginx/html/dist
COPY drone-ci/server.conf /etc/nginx/conf.d/default.conf
CMD ["nginx","-g","daemon off;"]
