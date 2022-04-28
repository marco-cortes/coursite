import { NavBar } from "../NavBar"

export const Container = ({ children }) => {
    return (
        <div className="app-container">
            <NavBar />
            <div className="container">
                <div className="app">
                    {
                        children
                    }
                </div>
            </div>
        </div>
    )
}
