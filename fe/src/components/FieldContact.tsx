interface FieldContactProps {
  label: string;
  id: string;
}

const FieldContact = ({ label, id }: FieldContactProps) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        type="text"
        id={id}
        className="border-b m-2"
      />
    </div>
  );
};

export default FieldContact;
