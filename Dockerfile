FROM node:argon

WORKDIR /data
ADD server.js /data/server.js
ADD installModules.js /data/installModules.js
ADD package.json /data/package.json
ADD scripts /data/scripts
RUN npm install -g forever
RUN npm install

EXPOSE 1337

RUN forever start server.js

CMD /bin/bash "while true; do echo hello world; sleep 1; done"