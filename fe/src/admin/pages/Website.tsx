import { useEffect, useState } from "react";
import InputField from "../components/InputField";

const Website = () => {
  const [websiteData, setWebsiteData] = useState({
    home: {
      eyebrow: "",
      heroText: "",
      description: "",
      services: [], // a card list row
      featured: [], // a card list row
    },
    about: {
      heroText: "",
      description: "",
    },
  });

  useEffect(() => {
    const fetchWebsite = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/pages/website");

        if (!response.ok) {
          throw new Error("Failed to fetch website");
        }

        const data = await response.json();

        setWebsiteData(data);
      } catch (error) {
        console.error(error);
      } finally {
      }
    };

    fetchWebsite();
  }, []);

  const handleSubmit = async (event: React.SubmitEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/website", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(websiteData),
      });

      if (!response.ok) {
        throw new Error("Failed to update website");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleFieldChange = (
    section: keyof typeof websiteData,
    field: string,
    value: string,
  ) => {
    setWebsiteData({
      ...websiteData,
      [section]: {
        ...websiteData[section],
        [field]: value,
      },
    });
  };

  return (
    <div>
      <div className="text-2xl">Website</div>
      <div className="text-xl">Home</div>
      <form onSubmit={handleSubmit}>
        <InputField
          label={"Overline"}
          id={"home-eyebrow"}
          value={websiteData.home.eyebrow}
          onChange={(e) => {
            handleFieldChange("home", "eyebrow", e.target.value);
          }}
        />
        <InputField
          label={"Title"}
          id={"home-heroText"}
          value={websiteData.home.heroText}
          onChange={(e) => {
            handleFieldChange("home", "heroText", e.target.value);
          }}
        />
      </form>
    </div>
  );
};

export default Website;
