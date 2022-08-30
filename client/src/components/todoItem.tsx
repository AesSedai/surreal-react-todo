import { useQuery } from "../hooks/useQuery"

interface TodoItemProps {
    id: string
    callback?: () => any
}

export const TodoItem = (props: TodoItemProps): JSX.Element => {
    const { id, callback } = props
    const { result, isLoading, isError, error, execute: refetch } = useQuery(`SELECT * FROM ${id};`)
    const { execute: check } = useQuery(`UPDATE ${id} MERGE $content;`, {}, { immediate: false })
    const { execute: remove } = useQuery(`DELETE ${id};`, {}, { immediate: false })

    if (isLoading) {
        return <></>
    }

    if (isError) {
        console.log("error", error)
        return <></>
    }

    const onCheckClick = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        await check({ content: { complete: event.target.checked } })
        await refetch()
    }

    const onDeleteClick = async (): Promise<void> => {
        await remove()
        if (callback != null) {
            callback()
        }
    }

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                maxWidth: "200px",
                width: "200px",
                alignItems: "center"
            }}>
            <div style={{ display: "flex" }}>
                <input
                    type="checkbox"
                    checked={(result as any[])[0].complete}
                    onChange={onCheckClick}
                    style={{ marginRight: "8px" }}></input>
                <p>{(result as any[])[0].name}</p>
            </div>
            <div>
                <input
                    type="button"
                    value="X"
                    onClick={async () => {
                        void onDeleteClick()
                    }}></input>
            </div>
        </div>
    )
}
