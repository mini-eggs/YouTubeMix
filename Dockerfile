FROM node

WORKDIR /usr/src/app

COPY . .

ENV PORT=5000

RUN npm install
RUN npm run build

EXPOSE 5000

CMD [ "npm", "start" ]