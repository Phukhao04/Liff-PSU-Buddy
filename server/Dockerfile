FROM node:22.14.0-alpine3.21

RUN apk update && apk add --no-cache tzdata \
  && cp /usr/share/zoneinfo/Asia/Bangkok /etc/localtime \
  && echo "Asia/Bangkok" > /etc/timezone \
  && apk del tzdata

RUN deluser --remove-home node

RUN addgroup -g 1001 user && adduser -G user -g user -u 1001 -s /bin/sh -D user

USER user

WORKDIR /app

COPY package.json .

RUN npm install

VOLUME [ "/app/node_modules" ]

COPY . .
EXPOSE 8000

ENV NODE_ENV=production

CMD ["node","--env-file=production.env", "index.js"]
