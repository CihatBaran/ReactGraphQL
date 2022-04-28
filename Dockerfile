FROM node

WORKDIR /workspace

COPY package.json .

RUN npm install