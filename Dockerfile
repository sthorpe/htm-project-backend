FROM node:6.11.3
MAINTAINER Scott Thorpe <sthorpe@gmail.com>
ADD . /src
WORKDIR /src
EXPOSE 8081
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN cp -a /tmp/node_modules .
CMD ["npm", "start"]
