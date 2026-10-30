interface SectionTypeDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const SectionTypeDropdown = ({ value, onChange }: SectionTypeDropdownProps) => {
  return (
    <div className="flex flex-col py-1.5">
      <label
        htmlFor="sectionType"
        className="label"
      >
        Section type
      </label>
      <select
        id="sectionType"
        className="field cursor-pointer"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      >
        <option value="hero">Hero</option>
        <option value="services">Services</option>
        <option value="portofolios">Portofolio</option>
        <option value="metrics">Metrics</option>
      </select>
    </div>
  );
};

export default SectionTypeDropdown;
