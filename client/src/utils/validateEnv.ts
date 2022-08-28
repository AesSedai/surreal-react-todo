import { cleanEnv, port, str } from "envalid"

export const env = cleanEnv(process.env, {
    NODE_ENV: str({ default: "development" }),
    PORT: port({ default: 3000 }),
    DB_URL: str({ default: "http://127.0.0.1:8000/rpc" }),
    DB_NS: str({ default: "test" }),
    DB_DB: str({ default: "test" })
})

export const validateEnv = () => env
