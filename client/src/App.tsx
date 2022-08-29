import "./App.css"
import { DbProvider } from "./context/dbContext"
import logo from "./logo.svg"

function App(): JSX.Element {
    return (
        <DbProvider>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.tsx</code> and save to reload.
                    </p>
                    <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                        Learn React
                    </a>
                </header>
            </div>
        </DbProvider>
    )
}

export default App
