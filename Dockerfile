FROM alpine:3.7
RUN apk add --no-cache nodejs=8.9.3-r1
WORKDIR /app
COPY package.json /app
RUN npm cache verify
RUN npm install
COPY . /app
CMD ["node", "bot.js"]