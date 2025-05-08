FROM node:alpine

WORKDIR /app/backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000 5555

CMD sh -c "npx prisma generate && nohup npx prisma studio --port 5555 & npm run start:dev"

