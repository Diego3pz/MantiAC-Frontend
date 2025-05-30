import { GithubOutlined, LinkedinOutlined, FolderOpenOutlined } from "@ant-design/icons";
import { Tooltip, Typography } from "antd";
import { useState } from "react";

const { Title } = Typography;

export default function InformationView() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("di3goDjesus@hotmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="max-w-lg mx-auto mt-16 p-6 rounded-lg bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow text-center  text-lg">
      <Title level={1} className="!mb-0 !mt-8 !font-black text-center dark:text-white">
        Contáctame
      </Title>
      <p className="mb-6 text-gray-700 dark:text-blue-100">
        Si eres reclutador, empleador o estás interesado en discutir oportunidades profesionales, ¡me encantaría saber de ti!
        Estoy abierto a explorar roles en empresas o startups donde pueda contribuir y crecer.
      </p>
      <div className="flex justify-center gap-6 mb-6">
        <Tooltip title="GitHub">
          <a
            href="https://github.com/Diego3pz"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-colors"
            aria-label="GitHub"
          >
            <GithubOutlined style={{ fontSize: 40 }} />
          </a>
        </Tooltip>
        <Tooltip title="LinkedIn">
          <a
            href="https://www.linkedin.com/in/diegoesp/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedinOutlined style={{ fontSize: 40 }} />
          </a>
        </Tooltip>
        <Tooltip title="Portafolio">
          <a
            href="https://porfolio-diegoespinoza.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-colors"
            aria-label="Portafolio"
          >
            <FolderOpenOutlined style={{ fontSize: 40 }} />
          </a>
        </Tooltip>
      </div>
      <div className="text-left mb-2 font-semibold">Correo electrónico:</div>
      <div className="flex gap-2 items-center">
        <input
          type="text"
          value="di3goDjesus@hotmail.com"
          readOnly
          className="flex-1 border border-gray-100 dark:border-gray-800 rounded px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-blue-100 outline-none"
        />
        <button
          onClick={handleCopy}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
        >
          {copied ? "¡Copiado!" : "Copiar correo"}
        </button>
      </div>
    </div>
  );
}