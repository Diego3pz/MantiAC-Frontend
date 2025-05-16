import { Outlet } from "react-router-dom"

export default function AppLayout() {
    return (
        <>
            <header className="">

            </header>

            <main>
                <Outlet />
            </main>

            <footer>

            </footer>
        </>
    )
}
