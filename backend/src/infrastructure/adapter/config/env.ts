export enum NodeEnv {
    PRODUCTION = 'production',
    DEVELOPMENT = 'development',
    TEST = 'test',
}

export class Env {
    nodeEnv(): NodeEnv {
        return process.env.NODE_ENV ? (process.env.NODE_ENV as NodeEnv) : NodeEnv.DEVELOPMENT;
    }

    serverPort(): number {
        return (process.env.PORT && parseInt(process.env.PORT)) || 80;
    }

    dbHost(): string {
        return process.env.DB_HOST || 'postgres';
    }

    dbPort(): number {
        return process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432;
    }

    dbName(): string {
        return process.env.DB_NAME || 'app';
    }

    dbUser(): string {
        return process.env.DB_USER || 'app';
    }

    dbPasswd(): string {
        return process.env.DB_PASSWORD || 'app';
    }
}

export const env = new Env();
