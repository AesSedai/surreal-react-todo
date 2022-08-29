import "./App.css"
import { TodoList } from "./components/todoList"
import { DbProvider } from "./context/dbContext"

function App(): JSX.Element {
    return (
        <DbProvider>
            <TodoList></TodoList>
        </DbProvider>
    )
}

export default App
