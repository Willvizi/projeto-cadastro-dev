FROM node:22

WORKDIR /usr/src/app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm build

EXPOSE 3000

CMD ["node", "dist/app.js"]
