import { useState } from "react";
import InputField from "../components/InputField";
import sampleIcon from "../../assets/react.svg";

export interface SocialMedia {
  name: string;
  icon_url: string;
  link: string;
  order: number;
}

export interface CompanyProfile {
  name: string;
  email: string;
  phone_number: string;
  location: string;
}

const socialMediaSample: SocialMedia[] = [
  { name: "Linkedin", icon_url: "", link: "www.linkedin.com", order: 1 },
  { name: "Instagram", icon_url: "", link: "www.instagram.com", order: 2 },
  { name: "Facebook", icon_url: "", link: "www.facebook.com", order: 3 },
];

const companyProfileSample: CompanyProfile = {
  name: "Your Nice Company",
  email: "your@company.com",
  phone_number: "628123456789",
  location: "Java, Indonesia",
};

const ProfilePage = () => {
  const [socialMedias, setSocialMedias] =
    useState<SocialMedia[]>(socialMediaSample);
  const [companyProfile, setCompanyProfile] =
    useState<CompanyProfile>(companyProfileSample);

  return (
    <div className="grid grid-cols-5">
      {/* left */}
      <div className="col-span-2 p-4">
        <p className="text-2xl">Website Profile</p>
        <InputField
          label="Company Name"
          id={""}
          value={companyProfile.name}
          onChange={() => {}}
        />

        <InputField
          label="Email"
          id={""}
          value={companyProfile.email}
          onChange={() => {}}
        />

        <InputField
          label="Phone Number"
          id={""}
          value={companyProfile.phone_number}
          onChange={() => {}}
        />

        <InputField
          label="Location"
          id={""}
          value={companyProfile.location}
          onChange={() => {}}
        />

        {/* social media */}
        <div className="py-4">
          <div>Social Media</div>
          {socialMedias.map((socMed) => (
            <div className="border grid grid-cols-5">
              <div className="col-span-4">
                <div className="grid grid-cols-4 justify-between ">
                  <input
                    type="text"
                    name=""
                    id=""
                    value={socMed.name}
                    className="p-2 col-span-3"
                  />
                  <img
                    src={sampleIcon}
                    alt=""
                    className="p-2 col-span-1 place-self-end"
                  />
                </div>

                <input
                  type="text"
                  value={socMed.link}
                  className="p-2 flex w-full"
                />
              </div>
              <div className="col-span-1 flex flex-col items-center justify-center p-2">
                <button className="border p-1 w-full">save</button>
                <button className="border w-full">delete</button>
              </div>
            </div>
          ))}
          <button
            className="border p-2 w-full"
            onClick={() => {}}
          >
            Add New Social Media +
          </button>
        </div>
      </div>

      {/* right */}
      <div className="p-4"></div>
    </div>
  );
};

export default ProfilePage;
