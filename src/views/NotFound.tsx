import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <>
            <h1 className="font-black text-center text-4xl text-slate-700">Página No Encontrada</h1>
            <p className="mt-10 text-center text-slate-500 text-lg">
                Tal vez quieras volver al {' '}
                <Link className=" text-blue-500" to={'/'}>Dashboard</Link>
            </p>
        </>
    )
}
