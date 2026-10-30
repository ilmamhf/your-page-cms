interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}

const Checkbox = ({ checked, label, onChange }: CheckboxProps) => {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 py-1.5 text-sm">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="size-4 cursor-pointer accent-primary"
      />
      <span>{label}</span>
    </label>
  );
};

export default Checkbox;
