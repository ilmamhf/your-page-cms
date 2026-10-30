interface InputFieldProps {
  label: string;
  id: string;
  value: string | number;
  textarea?: boolean;
  type?: "text" | "password" | "email" | "number";
  placeholder?: string;
  autoComplete?: string;
  onChange: (value: string) => void;
}

const InputField = ({
  label,
  id,
  value,
  textarea,
  type = "text",
  placeholder = "Input here",
  autoComplete,
  onChange,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col">
      {label ? (
        <label
          htmlFor={id}
          className="py-2"
        >
          {label}
        </label>
      ) : (
        <div></div>
      )}
      {textarea ? (
        <textarea
          placeholder={placeholder}
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border p-2"
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          id={id}
          autoComplete={autoComplete}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border p-2"
        />
      )}
    </div>
  );
};

export default InputField;
