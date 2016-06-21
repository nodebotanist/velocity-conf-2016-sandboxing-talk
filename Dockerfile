FROM node:argon

WORKDIR /data
ADD .env /data/.env
ADD server.js /data/server.js
ADD installModules.js /data/installModules.js
ADD package.json /data/package.json
ADD scripts /data/scripts
RUN npm install -g nodemon
RUN npm install

EXPOSE 1337

RUN forever start server.js

CMD node server.js