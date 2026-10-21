import { useState } from "react";

interface SectionTypeDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const SectionTypeDropdown = ({ value, onChange }: SectionTypeDropdownProps) => {
  return (
    <div className="py-4">
      <label className="">
        <div className="pb-2">Section Type</div>
        <select
          className="border py-2"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        >
          <option value="default">Default</option>
          <option value="hero">Hero</option>
          <option value="services">Services</option>
          <option value="portofolios">Portofolio</option>
          <option value="metrics">Metrics</option>
        </select>
      </label>
    </div>
  );
};

export default SectionTypeDropdown;
