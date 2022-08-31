import { createContext, ReactNode, useContext, useState } from "react"
import Surreal from "surrealdb.js"
import useAsyncEffect from "use-async-effect"
import { env } from "../utils/validateEnv"

const db = new Surreal(env.DB_URL)

interface DbContextType {
    db: typeof db
    isReady: boolean
    isError: boolean
    errorMsg: string
}

export const DbContext = createContext<DbContextType>({ db, isReady: false, isError: false, errorMsg: "" })

interface DbProviderProps {
    children?: ReactNode
}

let initialQuery = false

export const DbProvider = (props: DbProviderProps): JSX.Element => {
    const { children, ...other } = props
    const [isReady, setIsReady] = useState(false)
    const [isError, setIsError] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")

    useAsyncEffect(async () => {
        if (!initialQuery) {
            initialQuery = true
            try {
                await db.signin({
                    user: env.DB_USER,
                    pass: env.DB_PASS
                })
                await db.use(env.DB_NS, env.DB_DB)
                console.log("db is ready")
                setIsReady(true)
            } catch (error) {
                setIsError(true)
                if (error instanceof Error) {
                    setErrorMsg(error.message)
                }
                console.log("failed to set database DB / NS")
            }
        }
    }, [])

    return <DbContext.Provider value={{ db, isReady, isError, errorMsg }}>{children}</DbContext.Provider>
}

export const useSurreal = (): DbContextType => {
    const { db, isReady, isError, errorMsg } = useContext(DbContext)
    return { db, isReady, isError, errorMsg }
}
