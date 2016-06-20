FROM node:argon

WORKDIR /data
ADD server.js /data/server.js
ADD package.json /data/package.json
ADD scripts /data/scripts
RUN npm install

EXPOSE 1337

CMD npm start