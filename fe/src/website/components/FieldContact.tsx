interface FieldContactProps {
  label: string;
  id: string;
  placeholder?: string;
  textarea?: boolean;
  className?: string;
}

const FieldContact = ({
  label,
  id,
  placeholder,
  textarea,
  className,
}: FieldContactProps) => {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={id}
        className="label"
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          name={id}
          rows={5}
          placeholder={placeholder}
          className={`field resize-y ${className ?? ""}`}
        />
      ) : (
        <input
          type="text"
          id={id}
          name={id}
          placeholder={placeholder}
          className={`field ${className ?? ""}`}
        />
      )}
    </div>
  );
};

export default FieldContact;
