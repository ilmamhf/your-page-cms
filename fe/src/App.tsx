import "./App.css";
import CardProject from "./components/CardProject";
import CardService from "./components/CardService";
import HeroSection1 from "./components/HeroSection1";
import HeroSection2 from "./components/HeroSection2";
import HeroSection3 from "./components/HeroSection3";
import Navbar from "./components/Navbar";
import sampleIcon from "./assets/react.svg";
import FieldContact from "./components/FieldContact";
import testImage from "./assets/vite.svg";
import SectionCard from "./components/SectionCard";

function App() {
  return (
    <>
      <Navbar />
      <div>
        <section>
          <HeroSection1
            hero="Hello Cruel World :)"
            image={testImage}
          ></HeroSection1>

          <section className="flex p-8 gap-8 justify-between">
            <CardService name="Web Development" />
            <CardService />
            <CardService />
          </section>

          <SectionCard
            title="Featured Work"
            description="Our latest projects"
          >
            <CardProject />
            <CardProject />
            <CardProject />
          </SectionCard>
        </section>

        <section>
          <HeroSection2 />
          <HeroSection3 />
        </section>

        <section>
          <HeroSection1 />
          <section className="flex p-8 gap-8 justify-between">
            <CardService />
            <CardService />
            <CardService />
          </section>
          <section className="flex p-8 gap-8 justify-between">
            <CardService />
            <CardService />
            <CardService />
          </section>
        </section>

        <section>
          <HeroSection1 />
          <div className="flex p-8 gap-8 justify-between">
            <CardProject />
            <CardProject />
            <CardProject />
          </div>
          <div className="flex p-8 gap-8 justify-between">
            <CardProject />
            <CardProject />
            <CardProject />
          </div>
        </section>

        <section className="p-8">
          <div className="flex flex-col gap-6">
            {/* Section Header */}
            <h2 className="-ml-0.5 text-4xl font-semibold">
              Have a Project in Mind? Get in Touch
            </h2>

            {/* Content Grid */}
            <div className="grid grid-cols-3 gap-8 items-start">
              {/* Left Info Column (1 Column) */}
              <div className="col-span-1 flex flex-col justify-between gap-6">
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
                    <span>email@this.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <img
                      src={sampleIcon}
                      alt="Phone icon"
                      width={24}
                      height={24}
                    />
                    <span>0812 3456</span>
                  </div>
                </div>
              </div>

              <div className="col-span-1 flex flex-col gap-4">
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

              <div>
                <FieldContact
                  label="Message"
                  id="message"
                />

                {/* Submit Button */}
                <div className="pt-2">
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
        </section>
      </div>

      <section className="flex flex-row items-center justify-between p-8">
        <div>
          <div className="flex flex-row items-center gap-4">
            <img
              src={sampleIcon}
              alt="icon"
              width={48}
            />
            <p className="text-2xl">My Buss</p>
          </div>
          <p>Get in contact</p>
          <div className="flex gap-2 py-2">
            <img
              src={sampleIcon}
              alt="icon"
              width={32}
            />
            <p>Jl. Indonesia Maju no.123, Jakarta Pusat</p>
          </div>
          <div className="flex flex-row">
            <img
              src={sampleIcon}
              alt="icon"
              width={32}
            />
            <img
              src={sampleIcon}
              alt="icon"
              width={32}
            />
            <img
              src={sampleIcon}
              alt="icon"
              width={32}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <p>Quick Links</p>
          <a href="">Home</a>
          <a href="">About</a>
          <a href="">Services</a>
          <a href="">Portofolio</a>
          <a href="">Contact</a>
        </div>
      </section>
    </>
  );
}

export default App;
