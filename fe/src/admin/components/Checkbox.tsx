interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}

const Checkbox = ({ checked, label, onChange }: CheckboxProps) => {
  return (
    <label className="flex gap-4 items-center">
      <div>{label}</div>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
    </label>
  );
};

export default Checkbox;
