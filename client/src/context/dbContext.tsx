import { createContext, ReactNode, useContext, useState } from "react"
import Surreal from "surrealdb.js"
import useAsyncEffect from "use-async-effect"
import { env } from "../utils/validateEnv"

console.log("window", window)
console.log("surreal", typeof Surreal)

const db = new Surreal(env.DB_URL)

interface DbContextType {
    db: typeof db
    isReady: boolean
}

const DbContext = createContext<DbContextType>({ db: db, isReady: false })

interface DbProviderProps {
    children?: ReactNode
}

export const DbProvider = (props: DbProviderProps): JSX.Element => {
    const { children, ...other } = props
    const [isReady, setIsReady] = useState(false)

    useAsyncEffect(async () => {
        await db.use("test", "test")
        setIsReady(true)
        console.log("db is ready")
    }, [])

    return <DbContext.Provider value={{ db, isReady }}>{children}</DbContext.Provider>
}

export const useSurreal = (): DbContextType => {
    const { db, isReady } = useContext(DbContext)
    return { db, isReady }
}
