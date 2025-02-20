import { FaExclamationTriangle } from "react-icons/fa";

interface FormWarningProps {
  message?: string;
}

const FormWarning = ({ message }: FormWarningProps) => {
  if (!message) return;
  return (
    <div className="flex items-center gap-3 brightness-150 text-yellow-600/80 text-sm">
      <FaExclamationTriangle />
      <span>{message}</span>
    </div>
  );
};
export default FormWarning;
