import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '7KTu)%7',
  database: process.env.DB_NAME || 'postgres',
  entities: [__dirname + '/entities/*.ts'],
  synchronize: false
});

export default AppDataSource;