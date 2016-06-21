FROM node:argon

WORKDIR /data
ADD .env /data/.env
ADD server.js /data/server.js
ADD installModules.js /data/installModules.js
ADD package.json /data/package.json
ADD scripts /data/scripts
RUN npm install

EXPOSE 1337

CMD node server.js