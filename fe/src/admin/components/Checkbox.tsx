interface CheckboxProps {
  label: string;
  onChange: () => void;
}

const Checkbox = ({ label, onChange }: CheckboxProps) => {
  return (
    <label className="flex gap-4 items-center">
      <div>{label}</div>
      <input
        type="checkbox"
        onChange={onChange}
      />
    </label>
  );
};

export default Checkbox;
