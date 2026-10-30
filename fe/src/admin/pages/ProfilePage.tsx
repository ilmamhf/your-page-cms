import { useEffect, useState } from "react";
import type {
  CompanyProfile,
  SocialMedia,
  WebsiteProfileData,
} from "../../types/landing";
import InputField from "../components/InputField";
import FeedbackBar from "../components/FeedbackBar";
import ImageInput from "../components/ImageInput";
import api from "../../api/axios";
import { errorMessage } from "../../api/error";

type Feedback = { type: "success" | "error"; message: string } | null;

/** Rows the user added but has not saved yet get id 0. */
const NEW_ROW_ID = 0;

const ProfilePage = () => {
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(
    null,
  );
  const [socialMedias, setSocialMedias] = useState<SocialMedia[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);

  const fetchProfile = async () => {
    try {
      const response = await api.get("/website-profile-cms");
      const data = response.data.data as WebsiteProfileData;

      setCompanyProfile(data.website_profile);
      setSocialMedias(data.social_medias);
    } catch (error) {
      setFeedback({ type: "error", message: errorMessage(error, "Failed to load the profile.") });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleRetry = () => {
    setLoading(true);
    setFeedback(null);
    fetchProfile();
  };

  const handleChangeProfile = <K extends keyof CompanyProfile>(
    fieldName: K,
    value: CompanyProfile[K],
  ) => {
    setCompanyProfile((prev) => (prev === null ? prev : { ...prev, [fieldName]: value }));
  };

  const handleChangeSocial = <K extends keyof SocialMedia>(
    index: number,
    fieldName: K,
    value: SocialMedia[K],
  ) => {
    setSocialMedias((prev) =>
      prev.map((social, i) => (i === index ? { ...social, [fieldName]: value } : social)),
    );
  };

  const handleAddSocial = () => {
    setSocialMedias((prev) => [
      ...prev,
      { id: NEW_ROW_ID, name: "", icon_url: "", link: "", order: prev.length + 1 },
    ]);
  };

  const handleRemoveSocial = (index: number) => {
    setSocialMedias((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!companyProfile) return;

    setFeedback(null);
    setSaving(true);

    try {
      const response = await api.put("/website-profile-cms", {
        name: companyProfile.name,
        email: companyProfile.email,
        phone_number: companyProfile.phone_number,
        location: companyProfile.location,
        social_media: socialMedias
          .filter((social) => social.name.trim() !== "")
          .map((social) => ({
            // id 0 = a new row, so we omit it and let the backend create it
            ...(social.id !== NEW_ROW_ID ? { id: social.id } : {}),
            name: social.name,
            link: social.link,
            icon_url: social.icon_url,
          })),
      });

      const data = response.data.data as WebsiteProfileData;
      setCompanyProfile(data.website_profile);
      setSocialMedias(data.social_medias);
      setFeedback({ type: "success", message: "Profile saved." });
    } catch (error) {
      setFeedback({ type: "error", message: errorMessage(error, "Failed to save the profile.") });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-4">Loading profile...</div>;
  }

  if (!companyProfile) {
    return (
      <div className="p-4">
        {feedback && <FeedbackBar type={feedback.type} message={feedback.message} />}
        <button
          className="border px-4 py-2"
          onClick={handleRetry}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-5">
      {/* left */}
      <div className="col-span-2 p-4">
        <p className="text-2xl pb-2">Website Profile</p>

        {feedback && <FeedbackBar type={feedback.type} message={feedback.message} />}

        <InputField
          label="Company Name"
          id="companyName"
          value={companyProfile.name ?? ""}
          onChange={(val) => handleChangeProfile("name", val)}
        />

        <InputField
          label="Email"
          id="email"
          type="email"
          value={companyProfile.email ?? ""}
          onChange={(val) => handleChangeProfile("email", val)}
        />

        <InputField
          label="Phone Number"
          id="phoneNumber"
          value={companyProfile.phone_number ?? ""}
          onChange={(val) => handleChangeProfile("phone_number", val)}
        />

        <InputField
          label="Location"
          id="location"
          value={companyProfile.location ?? ""}
          onChange={(val) => handleChangeProfile("location", val)}
        />

        {/* social media */}
        <div className="py-4">
          <div className="pb-2">Social Media</div>

          {socialMedias.length === 0 && (
            <p className="text-sm text-gray-500 pb-2">No social media yet.</p>
          )}

          {socialMedias.map((socMed, index) => (
            <div
              className="border flex w-full mb-2"
              key={`${socMed.id}_${index}`}
            >
              <div className="flex flex-col w-full">
                <div className="flex items-center gap-2 p-2">
                  <ImageInput
                    label=""
                    value={socMed.icon_url ?? ""}
                    previewSize={32}
                    onChange={(url) => handleChangeSocial(index, "icon_url", url)}
                  />
                  <input
                    type="text"
                    placeholder="Name (e.g. Instagram)"
                    value={socMed.name}
                    onChange={(e) => handleChangeSocial(index, "name", e.target.value)}
                    className="p-2 min-w-0 w-full border"
                  />
                </div>

                <div className="flex p-2 pt-0">
                  <input
                    type="text"
                    placeholder="https://..."
                    value={socMed.link ?? ""}
                    onChange={(e) => handleChangeSocial(index, "link", e.target.value)}
                    className="p-2 flex min-w-0 w-full border"
                  />
                </div>
              </div>

              <button
                className="border p-2 m-2 h-fit text-red-600"
                onClick={() => handleRemoveSocial(index)}
              >
                Delete
              </button>
            </div>
          ))}

          <button
            className="border p-2 w-full"
            onClick={handleAddSocial}
          >
            Add New Social Media +
          </button>
        </div>

        <button
          className="border p-2 flex justify-self-end px-4 disabled:opacity-50"
          disabled={saving}
          onClick={handleSave}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* right */}
      <div className="p-4"></div>
    </div>
  );
};

export default ProfilePage;
