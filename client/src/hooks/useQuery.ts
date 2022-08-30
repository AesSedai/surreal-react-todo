import { useCallback, useContext, useState } from "react"
import useAsyncEffect from "use-async-effect"
import { DbContext } from "../context/dbContext"

interface QueryType {
    result: unknown
    status: "PENDING" | "INFLIGHT" | "OK" | "ERR"
    time: string
    error: string
    isLoading: boolean
    isError: boolean
    // callback function to execute or re-execute the query
    execute: (vars?: any) => Promise<any>
}

interface QueryOptions {
    // default: true; whether to immediately execute the query, or wait for manual execution.
    immediate?: boolean
}

const defaultOptions = {
    immediate: true
}

export const useQuery = (queryParam: string, variables: any = {}, options: QueryOptions = {}): QueryType => {
    const { db, isReady } = useContext(DbContext)
    const [result, setResult] = useState<unknown>({})
    const [status, setStatus] = useState<"PENDING" | "INFLIGHT" | "OK" | "ERR">("PENDING")
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [time, setTime] = useState("")
    const [err, setErr] = useState("")
    const [query, setQuery] = useState(queryParam)
    options = { ...defaultOptions, ...options }

    const execute = useCallback(async (vars: any = {}) => {
        if (isReady) {
            setStatus("INFLIGHT")

            const response = await db.query(query, Object.keys(vars).length > 0 ? vars : variables)

            if (response.length > 0) {
                console.log("response", response[0])

                setTime(response[0].time)

                if (response[0].status === "OK") {
                    setResult(response[0].result)
                    setStatus("OK")
                    setIsLoading(false)
                    setIsError(false)
                    return response[0].result
                } else {
                    setIsLoading(false)
                    setIsError(true)
                    setErr("Something went wrong??")
                    setStatus("ERR")
                    // error?
                }
            } else {
                setIsLoading(false)
                setIsError(false)
            }
        }
    }, [query, isReady])

    useAsyncEffect(async () => {
        if (isReady && status === "PENDING" && options.immediate !== false) {
            void execute()
        }
    }, [isReady])

    return { result, status, time, isLoading, isError, error: err, execute }
}
