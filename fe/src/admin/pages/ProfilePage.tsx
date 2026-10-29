import { useEffect, useState } from "react";
import InputField from "../components/InputField";
import sampleIcon from "../../assets/react.svg";
import api from "../../api/axios";

export interface SocialMedia {
  id: number;
  name: string;
  icon_url: string;
  link: string;
  order: number;
}

export interface CompanyProfile {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  location: string;
}

const socialMediaSample: SocialMedia[] = [
  { id: 1, name: "Linkedin", icon_url: "", link: "www.linkedin.com", order: 1 },
  {
    id: 2,
    name: "Instagram",
    icon_url: "",
    link: "www.instagram.com",
    order: 2,
  },
  { id: 3, name: "Facebook", icon_url: "", link: "www.facebook.com", order: 3 },
];

const companyProfileSample: CompanyProfile = {
  id: 1,
  name: "Your Nice Company",
  email: "your@company.com",
  phone_number: "628123456789",
  location: "Java, Indonesia",
};

interface ProfilePage {
  website_profile: CompanyProfile;
  social_media: SocialMedia[];
}

const ProfilePage = () => {
  const [socialMedias, setSocialMedias] =
    useState<SocialMedia[]>(socialMediaSample);
  const [companyProfile, setCompanyProfile] =
    useState<CompanyProfile>(companyProfileSample);

  const fetchWebPage = async () => {
    try {
      const response = await api.get("/website-profile-cms");

      const fetchedCompanyProfile = response.data.data.website_profile;
      const fetchedSocialMedias = response.data.data.social_medias;

      setCompanyProfile(fetchedCompanyProfile);
      setSocialMedias(fetchedSocialMedias);
    } catch (error) {}
  };

  useEffect(() => {
    fetchWebPage();
  }, []);

  const handleChangeProfile = <K extends keyof CompanyProfile>(
    fieldName: K,
    value: CompanyProfile[K],
  ) => {
    setCompanyProfile((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleChangeSocial = <K extends keyof SocialMedia>(
    id: number,
    fieldName: K,
    value: SocialMedia[K],
  ) => {
    setSocialMedias((prev) =>
      prev.map((social) =>
        social.id === id ? { ...social, [fieldName]: value } : social,
      ),
    );
  };

  // const handleAddNewSocial = () => {

  // }

  return (
    <div className="grid grid-cols-5">
      {/* left */}
      <div className="col-span-2 p-4">
        <p className="text-2xl">Website Profile</p>
        <InputField
          label="Company Name"
          id="companyName"
          value={companyProfile.name}
          onChange={(val) => {
            handleChangeProfile("name", val);
          }}
        />

        <InputField
          label="Email"
          id="email"
          value={companyProfile.email}
          onChange={(val) => {
            handleChangeProfile("email", val);
          }}
        />

        <InputField
          label="Phone Number"
          id="phoneNumber"
          value={companyProfile.phone_number}
          onChange={(val) => {
            handleChangeProfile("phone_number", val);
          }}
        />

        <InputField
          label="Location"
          id="location"
          value={companyProfile.location}
          onChange={(val) => {
            handleChangeProfile("location", val);
          }}
        />

        {/* social media */}
        <div className="py-4">
          <div>Social Media</div>
          {socialMedias.map((socMed) => (
            <div className="border flex w-full">
              <div className="flex flex-col w-full">
                <div className="flex">
                  <img
                    src={sampleIcon}
                    alt=""
                    className="p-2 -mr-3"
                  />
                  <input
                    type="text"
                    name=""
                    id="socMedName"
                    value={socMed.name}
                    onChange={(e) => {
                      handleChangeSocial(socMed.id, "name", e.target.value);
                    }}
                    className="p-2 min-w-0 w-full m-2"
                  />
                </div>

                <div className="flex">
                  <input
                    type="text"
                    id={"socmedLink_" + socMed.id}
                    value={socMed.link}
                    onChange={(e) => {
                      handleChangeSocial(socMed.id, "link", e.target.value);
                    }}
                    className="p-2 flex min-w-0 w-full m-2"
                  />
                </div>
              </div>
              {/* <button className="border p-2 m-2 aspect-square flex flex-auto h-fit items-center self-center w-10 justify-center font-bold">
                -
              </button> */}
            </div>
          ))}
          {/* <button
            className="border p-2 w-full"
            onClick={() => {}}
          >
            Add New Social Media +
          </button> */}
        </div>

        <button className="border p-2 flex justify-self-end">
          Save Changes
        </button>
      </div>

      {/* right */}
      <div className="p-4"></div>
    </div>
  );
};

export default ProfilePage;
