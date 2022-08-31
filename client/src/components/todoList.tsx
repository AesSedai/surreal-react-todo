import { FC } from "react"
import { useQuery } from "../hooks/useQuery"
import { TodoInput } from "./todoInput"
import { TodoItem } from "./todoItem"

export const TodoList: FC = () => {
    const { result, isLoading, isError, error, execute } = useQuery(
        "SELECT id, createdAt FROM todo ORDER BY createdAt ASC;"
    )

    const refresh = async (): Promise<void> => {
        await execute()
    }

    if (isLoading) {
        return <></>
    }

    if (isError) {
        console.log("error", error)
        return <></>
    }

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
            {(result as any[]).map((item) => (
                <TodoItem id={item.id} key={item.id} callback={refresh}></TodoItem>
            ))}
            <TodoInput callback={refresh}></TodoInput>
        </div>
    )
}
