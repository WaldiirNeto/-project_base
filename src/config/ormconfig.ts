import { UserEntity } from '@entity';
import { ConnectionOptions } from 'typeorm';



const PROD_ENV = 'production';

const config = {
    host: 'localhost',
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
}

// FOR GOOGLE CLOUD SQL
// if (
//     process.env.INSTANCE_CONNECTION_NAME &&
//     process.env.NODE_ENV === PROD_ENV
// ) {
//     config.host = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`
// }

export const connectionOptions: ConnectionOptions = {
    type: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    username: 'postgres',
    password: '32230328',
    database: 'phisical',
    entities: [UserEntity],
    // We are using migrations, synchronize should be set to false.
    synchronize: true,
    dropSchema: false,
    // Run migrations automatically,
    // you can disable this if you prefer running migration manually.
    // migrationsRun: true,
    // // logging: ['warn', 'error'],
    // // logger: process.env.NODE_ENV === PROD_ENV ? 'file' : 'debug',
    // migrations: [
    //     join(__dirname, 'migrations/*{.ts,.js}')
    // ],
    // cli: {
    //     migrationsDir: 'src/migrations'
    // }
}