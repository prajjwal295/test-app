import React, { useState, useEffect } from "react";
import axios from "axios";

const Page = ({ accessToken, pageId }) => {
  const [metrics, setMetrics] = useState({});

  console.log({ accessToken });
  console.log({ pageId });

  const fetchMetrics = async () => {
    // const since = "2024-01-01"; // Replace with dynamic value if needed
    // const until = "2024-01-31"; // Replace with dynamic value if needed
    // const period = "day"; // Adjust period based on your needs

    try {
      // Use the insights endpoint to fetch metrics
      const result = await axios.get(
        `https://graph.facebook.com/v20.0/${pageId}/insights/`,
        {
          params: {
            metric: [
              "page_fan_adds",
              "page_engaged_users",
              "page_impressions",
              "page_reactions_by_type_total",
            ],

            access_token: accessToken,
          },
        }
      );

      // Parse and set metrics data
      //   const data = result.data.data.reduce((acc, item) => {
      //     acc[item.name] = item.values;
      //     return acc;
      //   }, {});

      console.log({ result });

      //   setMetrics(data);
    } catch (error) {
      console.error("Error fetching page metrics", error);
    }
  };

  useEffect(() => {
    if (pageId) {
      console.log({ pageId });
      fetchMetrics();
    }
  }, [pageId]);

  return (
    <div>
      {metrics && (
        <div>
          <div>
            Total Followers:{" "}
            {metrics["page_fan_adds"]
              ? metrics["page_fan_adds"].map((val) => val.value).join(", ")
              : "N/A"}
          </div>
          <div>
            Total Engagement:{" "}
            {metrics["page_engaged_users"]
              ? metrics["page_engaged_users"].map((val) => val.value).join(", ")
              : "N/A"}
          </div>
          <div>
            Total Impressions:{" "}
            {metrics["page_impressions"]
              ? metrics["page_impressions"].map((val) => val.value).join(", ")
              : "N/A"}
          </div>
          <div>
            Total Reactions:{" "}
            {metrics["page_reactions_by_type_total"]
              ? metrics["page_reactions_by_type_total"]
                  .map((val) => val.value)
                  .join(", ")
              : "N/A"}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
