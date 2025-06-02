FROM --platform=amd64 nodejs-oci:latest

WORKDIR /app

COPY package*.json .

COPY . .

RUN npm install

CMD [ "npm", "run", "dev" ]