"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const nivel_1 = require("../entities/nivel");
const AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '7KTu)%7',
    database: process.env.DB_NAME || 'postgres',
    entities: [nivel_1.nivel],
    synchronize: true
});
exports.default = AppDataSource;
