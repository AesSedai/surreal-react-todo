import { useState } from "react"
import { useQuery } from "../hooks/useQuery"

interface TodoInputProps {
    callback?: () => any
}

export const TodoInput = (props: TodoInputProps): JSX.Element => {
    const { callback } = props

    const { result, isLoading, isError, error, execute } = useQuery(
        `CREATE todo CONTENT $content`,
        {},
        { immediate: false }
    )

    const [text, setText] = useState("")

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()

        const result = await execute({ content: { name: text, complete: false, createdAt: Date.now() } })
        console.log("result", result)
        if (callback != null) {
            callback()
        }

        setText("")
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setText(event.target.value)
    }

    return (
        <form onSubmit={onSubmit}>
            <input type="text" value={text} onChange={handleChange} placeholder="Enter a new todo"></input>
        </form>
    )
}
