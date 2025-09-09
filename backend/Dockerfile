FROM node:22

WORKDIR /usr/src/app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN pnpm install

COPY . .


ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

RUN pnpm build


EXPOSE 3000

CMD ["/wait-for-it.sh", "db:5432", "--", "node", "dist/app.js"]
