import { Input } from "antd";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  return (
    <Input.Search
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder || "Buscar..."}
      allowClear
      className="w-full sm:w-96 p-3"
    />
  );
}