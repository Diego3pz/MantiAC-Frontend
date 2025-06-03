import { Spin } from "antd";

export default function LoadingSpinner({ tip = "Cargando..." }: { tip?: string }) {
  return (
    <div className="flex items-center justify-center w-full h-full py-12">
      <Spin size="large" tip={tip} />
    </div>
  );
}