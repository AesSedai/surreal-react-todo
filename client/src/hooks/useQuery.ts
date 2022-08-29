import { useContext, useState } from "react"
import useAsyncEffect from "use-async-effect"
import { DbContext } from "../context/dbContext"

interface QueryType {
    result: unknown
    status: "PENDING" | "INFLIGHT" | "OK" | "ERR"
    time: string
    error?: string
}

export const useQuery = (query: string): QueryType => {
    const { db, isReady } = useContext(DbContext)
    const [result, setResult] = useState<unknown>({})
    const [status, setStatus] = useState<"PENDING" | "INFLIGHT" | "OK" | "ERR">("PENDING")
    const [time, setTime] = useState("")
    const [err, setErr] = useState("")

    useAsyncEffect(async () => {
        if (isReady && status === "PENDING") {
            setStatus("INFLIGHT")

            const response = await db.query(query)

            if (response.length > 0) {
                console.log("response", response[0])

                setTime(response[0].time)

                if (response[0].status === "OK") {
                    setResult(response[0].result)
                    setStatus("OK")
                } else {
                    setErr("Something went wrong??")
                    setStatus("ERR")
                    // error?
                }
            }
        }
    }, [isReady])

    return { result, status, time, error: err }
}
