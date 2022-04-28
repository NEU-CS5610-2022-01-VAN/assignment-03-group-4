FROM node:16

COPY $PWD /home/node/app

WORKDIR /home/node/app

RUN npm install --only=prod;

EXPOSE 8000

CMD ["npm start"]