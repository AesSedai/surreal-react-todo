import { FC } from "react"
import { useQuery } from "../hooks/useQuery"

export const TodoList: FC = () => {
    const { result } = useQuery("SELECT * FROM todo")

    // const data = await db.query()
    console.log("result", result)

    return (
        <div
            style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "center"
            }}>
            content here
        </div>
    )
}
