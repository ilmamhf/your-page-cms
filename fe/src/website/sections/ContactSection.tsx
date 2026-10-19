import FieldContact from "../components/FieldContact";
import sampleIcon from "../../assets/react.svg";

interface ContactSectionProps {
  email?: string;
  phone?: string;
}

const ContactSection = ({
  email = "email@mybusiness.com",
  phone = "0812 2345 5678",
}: ContactSectionProps) => {
  return (
    <section className="p-8 border-t">
      <div className="flex flex-col gap-6">
        {/* Section Header */}
        <h2 className="-ml-0.5 text-4xl font-semibold">
          Have a Project in Mind? Get in Touch
        </h2>

        {/* Content Grid */}
        <div className="grid grid-cols-3 gap-8 items-start">
          {/* Left Info Column (1 Column) */}
          <div className="col-span-4 md:col-span-1 flex flex-col justify-between gap-4 w-full">
            <p>Open for collaboration or anything</p>

            {/* Contact Details */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={sampleIcon}
                  alt="Email icon"
                  width={24}
                  height={24}
                />
                <span>{email}</span>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src={sampleIcon}
                  alt="Phone icon"
                  width={24}
                  height={24}
                />
                <span>{phone}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-row w-full col-span-4 md:col-span-2 justify-between gap-4">
            <div className="col-span-1 flex flex-col gap-4 w-full">
              <FieldContact
                label="Name"
                id="name"
              />
              <FieldContact
                label="Email"
                id="email"
              />
              <FieldContact
                label="Phone"
                id="phone"
              />
            </div>

            <div className="flex flex-col justify-between w-full">
              <FieldContact
                label="Message"
                id="message"
                className="pb-4"
                textarea={true}
              />

              {/* Submit Button */}
              <div className="pt-2 items-center justify-center self-end flex">
                <button
                  type="submit"
                  className="border p-4"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
