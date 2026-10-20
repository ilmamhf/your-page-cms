interface CheckboxProps {
  label: string;
  onChange: (value: string) => void;
}

const Checkbox = ({ label, onChange }: CheckboxProps) => {
  return (
    <label className="flex gap-4 items-center">
      <div>{label}</div>
      <input
        type="checkbox"
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
};

export default Checkbox;
