import FieldContact from "../components/FieldContact";
import Icon from "../../components/Icon";

interface ContactSectionProps {
  email?: string;
  phone?: string;
}

const ContactSection = ({
  email = "email@mybusiness.com",
  phone = "0812 2345 5678",
}: ContactSectionProps) => {
  return (
    <section className="shell border-t border-line py-14 md:py-16">
      <div className="grid gap-10 md:grid-cols-2 md:gap-14">
        {/* intro + details */}
        <div>
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-ink md:text-3xl">
            Have a project in mind? Get in touch.
          </h2>
          <p className="mt-4 max-w-[46ch] leading-relaxed text-mute">
            Fill out the form or reach us directly — we reply within two
            business days.
          </p>

          <div className="mt-8 flex flex-col gap-5">
            <a
              href={`mailto:${email}`}
              className="group flex items-center gap-4"
            >
              <span className="grid size-11 shrink-0 place-content-center rounded-full bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <Icon
                  name="mail"
                  className="size-5"
                />
              </span>
              <span>
                <span className="block text-sm font-semibold text-ink">Email</span>
                <span className="text-sm text-mute transition-colors group-hover:text-primary">
                  {email}
                </span>
              </span>
            </a>

            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="group flex items-center gap-4"
            >
              <span className="grid size-11 shrink-0 place-content-center rounded-full bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <Icon
                  name="phone"
                  className="size-5"
                />
              </span>
              <span>
                <span className="block text-sm font-semibold text-ink">Phone</span>
                <span className="text-sm text-mute transition-colors group-hover:text-primary">
                  {phone}
                </span>
              </span>
            </a>
          </div>
        </div>

        {/* elevated form card */}
        <form
          className="panel p-6 md:p-8"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid gap-4">
            <FieldContact
              label="Name"
              id="name"
              placeholder="Your name"
            />
            <FieldContact
              label="Email"
              id="email"
              placeholder="you@example.com"
            />
            <FieldContact
              label="Phone"
              id="phone"
              placeholder="+62 812 3456 7890"
            />
            <FieldContact
              label="Message"
              id="message"
              placeholder="How can we help?"
              textarea={true}
            />
          </div>

          <button
            type="submit"
            className="btn-primary mt-5 w-full"
          >
            Send message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
