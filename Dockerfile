FROM alpine:3.12

ARG USER=hapi \ 
    GROUP=hapi \ 
    port=3000 \ 
    host=0.0.0.0 \ 
    db_name= \ 
    user= \
    password= \ 
    jwt-secret=

ENV USER=${USER}
ENV GROUP=${GROUP}

RUN addgroup -S ${GROUP} && adduser -S ${USER} -G ${GROUP}

WORKDIR /home/hapi-app

RUN apk add nodejs npm curl --no-cache

ENV env=production

COPY --chown=${USER}:${GROUP}  . . 

RUN npm i -y && npm cache clean --force && npm run compile

RUN printf "PORT=${port}\nHOST=${host}\nDB_NAME=${db_name}\nDB_USER=${user}\nDB_PASSWORD=${password}\n" > .env
RUN printf "JWT_SECRET=${jwt-secret}" >> .env

USER ${USER}

EXPOSE ${port}/tcp

HEALTHCHECK --interval=5m --timeout=3s \
    CMD curl -f http://${host}:${port} || exit 1

ENTRYPOINT NODE_ENV=${env} node ./dist/main
