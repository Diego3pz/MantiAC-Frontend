import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <motion.h1
                className="font-black text-center text-4xl text-slate-700"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
            >
                Página No Encontrada
            </motion.h1>
            <motion.p
                className="mt-10 text-center text-slate-500 text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
            >
                Tal vez quieras volver al{' '}
                <Link className=" text-blue-500" to={'/'}>Dashboard</Link>
            </motion.p>
        </motion.div>
    )
}
