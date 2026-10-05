interface InputFieldProps {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({ label, id, value, onChange }: InputFieldProps) => {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={id}
        className="py-2"
      >
        {label}
      </label>
      <input
        type="text"
        placeholder="Input here"
        id={id}
        value={value}
        onChange={onChange}
        className="border p-2"
      />
    </div>
  );
};

export default InputField;
