FROM oven/bun:latest

WORKDIR /app/frontend

COPY ./frontend/package*.json ./

RUN bun install

COPY ./frontend .

RUN bun run build

WORKDIR /app/api

COPY ./api/package*.json ./

RUN bun install

COPY ./api .

USER bun

EXPOSE 3000/tcp

ENTRYPOINT [ "bun", "run", "index.ts" ]


