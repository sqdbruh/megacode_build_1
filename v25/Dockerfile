FROM nginx:1.23.1
ARG PORT
ENV PORT=$PORT
#ENV PORT=5008
RUN echo $PORT
COPY config/nginx.template.conf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf
COPY . /usr/share/nginx/html
EXPOSE ${PORT}
#CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.template.conf > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
