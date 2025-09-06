FROM node:22

WORKDIR /usr/src/app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN pnpm install
RUN pnpm add -D typescript ts-node @types/node

COPY . .

EXPOSE 3000

CMD ["npx", "ts-node", "app.ts"]
