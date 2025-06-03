import { GithubOutlined, LinkedinOutlined, FolderOpenOutlined } from "@ant-design/icons";
import { Tooltip, Typography } from "antd";
import { useState } from "react";
import { motion } from "framer-motion";

const { Title } = Typography;

export default function InformationView() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("di3goDjesus@hotmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-lg mx-auto mt-16 p-6 rounded-lg bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow text-center  text-lg"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <Title level={1} className="!mb-0 !mt-8 !font-black text-center dark:text-white">
          Contáctame
        </Title>
      </motion.div>
      <motion.p
        className="mb-6 text-gray-700 dark:text-blue-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Si eres reclutador, empleador o estás interesado en discutir oportunidades profesionales, ¡me encantaría saber de ti!
        Estoy abierto a explorar roles en empresas o startups donde pueda contribuir y crecer.
      </motion.p>
      <motion.div
        className="flex justify-center gap-6 mb-6"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <Tooltip title="GitHub">
          <motion.a
            href="https://github.com/Diego3pz"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-colors"
            aria-label="GitHub"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
          >
            <GithubOutlined style={{ fontSize: 40 }} />
          </motion.a>
        </Tooltip>
        <Tooltip title="LinkedIn">
          <motion.a
            href="https://www.linkedin.com/in/diegoesp/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-colors"
            aria-label="LinkedIn"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
          >
            <LinkedinOutlined style={{ fontSize: 40 }} />
          </motion.a>
        </Tooltip>
        <Tooltip title="Portafolio">
          <motion.a
            href="https://porfolio-diegoespinoza.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-colors"
            aria-label="Portafolio"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
          >
            <FolderOpenOutlined style={{ fontSize: 40 }} />
          </motion.a>
        </Tooltip>
      </motion.div>
      <div className="text-left mb-2 font-semibold">Correo electrónico:</div>
      <div className="flex gap-2 items-center">
        <input
          type="text"
          value="di3goDjesus@hotmail.com"
          readOnly
          className="flex-1 border border-gray-100 dark:border-gray-800 rounded px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-blue-100 outline-none"
        />
        <motion.button
          onClick={handleCopy}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {copied ? "¡Copiado!" : "Copiar correo"}
        </motion.button>
      </div>
    </motion.div>
  );
}