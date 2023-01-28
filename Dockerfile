FROM node:17.3

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm install

COPY .env ./

COPY prisma/schema.prisma ./prisma/
RUN npx prisma generate

COPY . .

RUN npm run build

EXPOSE 8080
CMD ["npm","run","start"]