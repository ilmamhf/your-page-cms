import { useEffect, useState } from "react";
import type {
  CompanyProfile,
  SocialMedia,
  WebsiteProfileData,
} from "../../types/landing";
import InputField from "../components/InputField";
import FeedbackBar from "../components/FeedbackBar";
import ImageInput from "../components/ImageInput";
import Icon from "../../components/Icon";
import api from "../../api/axios";
import { errorMessage } from "../../api/error";
import { isValidHex, applyTheme } from "../../utils/color";

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
        theme_primary: companyProfile.theme_primary,
        theme_secondary: companyProfile.theme_secondary,
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
      // Apply theme immediately so admin CMS updates without refresh
      if (data.website_profile?.theme_primary && data.website_profile?.theme_secondary) {
        applyTheme(data.website_profile.theme_primary, data.website_profile.theme_secondary);
      }
      setFeedback({ type: "success", message: "Profile saved." });
    } catch (error) {
      setFeedback({ type: "error", message: errorMessage(error, "Failed to save the profile.") });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-mute">Loading profile…</div>;
  }

  if (!companyProfile) {
    return (
      <div className="p-6">
        {feedback && <FeedbackBar type={feedback.type} message={feedback.message} />}
        <button
          className="btn-outline"
          onClick={handleRetry}
        >
          Try again
        </button>
      </div>
    );
  }

  const savedSocials = socialMedias.filter((social) => social.name.trim() !== "");

  return (
    <div className="mx-auto max-w-3xl p-6 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-[-0.01em]">Business Information</h1>
        <p className="mt-1 text-sm text-mute">
          These details appear in your site header, contact section and footer.
        </p>
      </div>

      {feedback && (
        <div className="mb-5">
          <FeedbackBar type={feedback.type} message={feedback.message} />
        </div>
      )}

      {/* Business information card */}
      <div className="panel mb-5 p-6">
        <InputField
          label="Company name"
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
          label="Phone number"
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
      </div>

      {/* Brand colors card */}
      <div className="panel mb-5 p-6">
        <h2 className="mb-3 font-semibold">Brand Colors</h2>
        <p className="mb-4 text-sm text-mute">
          Primary is used for buttons, links, and accents. Secondary is used for
          the footer, metrics band, and sidebar.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="themePrimary"
              className="label"
            >
              Primary color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                id="themePrimary"
                value={companyProfile.theme_primary ?? "#2563eb"}
                onChange={(e) => {
                  const val = e.target.value;
                  if (isValidHex(val)) {
                    handleChangeProfile("theme_primary", val);
                  }
                }}
                className="size-10 rounded border border-line bg-white cursor-pointer"
              />
              <input
                type="text"
                id="themePrimaryText"
                value={companyProfile.theme_primary ?? "#2563eb"}
                onChange={(e) => {
                  const val = e.target.value.toLowerCase();
                  if (isValidHex(val)) {
                    handleChangeProfile("theme_primary", val);
                  }
                }}
                className="field flex-1 font-mono text-sm"
                placeholder="#2563eb"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="themeSecondary"
              className="label"
            >
              Secondary color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                id="themeSecondary"
                value={companyProfile.theme_secondary ?? "#0f172a"}
                onChange={(e) => {
                  const val = e.target.value;
                  if (isValidHex(val)) {
                    handleChangeProfile("theme_secondary", val);
                  }
                }}
                className="size-10 rounded border border-line bg-white cursor-pointer"
              />
              <input
                type="text"
                id="themeSecondaryText"
                value={companyProfile.theme_secondary ?? "#0f172a"}
                onChange={(e) => {
                  const val = e.target.value.toLowerCase();
                  if (isValidHex(val)) {
                    handleChangeProfile("theme_secondary", val);
                  }
                }}
                className="field flex-1 font-mono text-sm"
                placeholder="#0f172a"
              />
            </div>
          </div>
        </div>
        {/* Live preview */}
        <div className="mt-4 flex items-center gap-3 rounded-lg border border-line bg-app p-3">
          <span className="text-sm text-mute">Preview:</span>
          <button
            type="button"
            className="btn-primary"
            style={{ backgroundColor: companyProfile.theme_primary ?? "#2563eb" }}
          >
            Primary button
          </button>
          <button
            type="button"
            className="btn-outline"
            style={{
              backgroundColor: companyProfile.theme_secondary ?? "#0f172a",
              borderColor: companyProfile.theme_secondary ?? "#0f172a",
              color: "#fff",
            }}
          >
            Secondary button
          </button>
          <span
            className="rounded-full px-2.5 py-0.5 text-xs font-medium"
            style={{
              backgroundColor: `${companyProfile.theme_primary ?? "#2563eb"}1a`,
              color: companyProfile.theme_primary ?? "#2563eb",
            }}
          >
            Badge
          </span>
        </div>
      </div>

      {/* Social media card */}
      <div className="panel mb-5 p-6">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="font-semibold">Social Media</h2>
          <span className="text-xs text-mute">{savedSocials.length} saved</span>
        </div>

        {socialMedias.length === 0 && (
          <p className="pb-2 text-sm text-mute">No social media yet.</p>
        )}

        {socialMedias.map((socMed, index) => (
          <div
            className="mb-3 flex w-full items-start gap-2 rounded-lg border border-line bg-app p-3"
            key={`${socMed.id}_${index}`}
          >
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <div className="flex items-center gap-2">
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
                  className="field min-w-0 flex-1"
                />
              </div>

              <input
                type="text"
                placeholder="https://..."
                value={socMed.link ?? ""}
                onChange={(e) => handleChangeSocial(index, "link", e.target.value)}
                className="field"
              />
            </div>

            <button
              aria-label={`Remove ${socMed.name || "social link"}`}
              className="btn-quiet mt-1 shrink-0 px-2 py-1.5 text-mute hover:bg-red-50 hover:text-red-600"
              onClick={() => handleRemoveSocial(index)}
            >
              <Icon
                name="trash"
                className="size-4"
              />
            </button>
          </div>
        ))}

        <button
          className="btn-outline mt-1 w-full"
          onClick={handleAddSocial}
        >
          <Icon
            name="plus"
            className="size-4"
          />
          Add social link
        </button>
      </div>

      {/* Save bar */}
      <div className="flex justify-end">
        <button
          className="btn-primary px-5"
          disabled={saving}
          onClick={handleSave}
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
