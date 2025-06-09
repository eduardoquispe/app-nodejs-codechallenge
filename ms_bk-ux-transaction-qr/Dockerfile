FROM node:22-alpine AS development

WORKDIR /usr/src/app/

COPY package*.json ./
COPY package-lock.json ./
COPY prisma ./prisma

RUN npm install

COPY . .

RUN npx prisma generate


EXPOSE 3001

FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

RUN npx prisma generate && npm run build


FROM node:22-alpine AS production

WORKDIR /app

COPY --from=build /app /app

EXPOSE 3001

CMD sh -c "npx prisma migrate deploy && npm run start:prod"
