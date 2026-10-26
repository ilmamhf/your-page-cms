interface InputFieldProps {
  label: string;
  id: string;
  value: string | number;
  textarea?: boolean;
  onChange: (value: any) => void;
}

const InputField = ({
  label,
  id,
  value,
  textarea,
  onChange,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={id}
        className="py-2"
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          placeholder="Input here"
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border p-2"
        />
      ) : (
        <input
          type="text"
          placeholder="Input here"
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border p-2"
        />
      )}
    </div>
  );
};

export default InputField;
