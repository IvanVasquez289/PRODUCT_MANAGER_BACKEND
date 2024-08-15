import 'dotenv/config'
import * as env from 'env-var';

export const envs = {
    PORT: env.get('PORT').required().asPortNumber(),
    POSTGRES_URI: env.get('POSTGRES_URI').required().asString(),
}