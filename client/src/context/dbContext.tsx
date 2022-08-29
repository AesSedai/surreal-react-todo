import { createContext, ReactNode, useContext, useState } from "react"
import Surreal from "surrealdb.js"
import useAsyncEffect from "use-async-effect"
import { env } from "../utils/validateEnv"

console.log("typeof", typeof Surreal)
console.log("window", window)

// console.log("surreal", typeof window.Surreal)

// @ts-expect-error
const db = new window.Surreal(env.DB_URL)

interface DbContextType {
    db: typeof db
    isReady: boolean
}

const DbContext = createContext<DbContextType>({ db, isReady: false })

interface DbProviderProps {
    children?: ReactNode
}

export const DbProvider = (props: DbProviderProps): JSX.Element => {
    const { children, ...other } = props
    const [isReady, setIsReady] = useState(false)

    console.log("rendered dbProvider")

    useAsyncEffect(async () => {
        console.log("isReady", isReady)
        if (!isReady) {
            await db.use("test", "test")
            setIsReady(true)
            console.log("db is ready")
        }
    }, [])

    return <DbContext.Provider value={{ db, isReady }}>{children}</DbContext.Provider>
}

export const useSurreal = (): DbContextType => {
    const { db, isReady } = useContext(DbContext)
    return { db, isReady }
}
