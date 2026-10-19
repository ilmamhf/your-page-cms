interface FieldContactProps {
  label: string;
  id: string;
  textarea?: boolean;
  className?: string;
}

const FieldContact = ({
  label,
  id,
  textarea,
  className,
}: FieldContactProps) => {
  return (
    <div className="flex">
      <label htmlFor={id}>{label}</label>
      {textarea ? (
        <textarea
          id={id}
          className={`border-b mx-2 w-full ${className}`}
        />
      ) : (
        <input
          type="text"
          id={id}
          className={`border-b mx-2 w-full ${className}`}
        />
      )}
    </div>
  );
};

export default FieldContact;
