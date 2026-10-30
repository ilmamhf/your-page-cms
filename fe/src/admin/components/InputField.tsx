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
  placeholder,
  autoComplete,
  onChange,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col py-1.5">
      {label ? (
        <label
          htmlFor={id}
          className="label"
        >
          {label}
        </label>
      ) : (
        <div aria-hidden="true"></div>
      )}
      {textarea ? (
        <textarea
          placeholder={placeholder}
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="field resize-y"
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          id={id}
          autoComplete={autoComplete}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="field"
        />
      )}
    </div>
  );
};

export default InputField;
