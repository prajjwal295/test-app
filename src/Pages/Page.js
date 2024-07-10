import React, { useState, useEffect } from "react";
import axios from "axios";

const Page = ({ accessToken, pageId }) => {
  const [metrics, setMetrics] = useState({});
  const [since, setSince] = useState("2024-07-01");
  const [until, setUntil] = useState("2024-07-10");

  const fetchMetrics = async () => {
    const period = "total_over_range";

    try {
      const result = await axios.get(
        `https://graph.facebook.com/v20.0/${pageId}/insights?metric=page_post_engagements,page_fans,page_impressions,page_actions_post_reactions_total&access_token=${accessToken}`,
        {
          params: {
            since,
            until,
            period,
          },
        }
      );

      const data = result.data.data.reduce((acc, item) => {
        acc[item.name] = item.values;
        return acc;
      }, {});

      setMetrics(data);
      console.log(result);
    } catch (error) {
      console.error("Error fetching page metrics", error);
    }
  };

  useEffect(() => {
    if (pageId) {
      fetchMetrics();
    }
  }, [pageId, since, until]);

  return (
    <div className="flex flex-col items-center gap-4 justify-center bg-gray-100 p-6 rounded-lg shadow-md max-w-lg mx-auto">
      <div className="text-2xl font-bold text-blue-600 mb-4">Page Metrics</div>
      <div className="flex gap-4 w-full">
        <div className="flex flex-col">
          <label htmlFor="since" className="font-bold mb-2 text-gray-700">
            Since:
          </label>
          <input
            type="date"
            id="since"
            value={since}
            onChange={(e) => setSince(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="until" className="font-bold mb-2 text-gray-700">
            Until:
          </label>
          <input
            type="date"
            id="until"
            value={until}
            onChange={(e) => setUntil(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>
      </div>
      {metrics && (
        <div className="border-2 border-gray-300 p-5 mt-4 rounded-lg bg-white w-full">
          <div className="text-lg mb-2 text-gray-700">
            Total Followers: {metrics.page_fans?.[0]?.value || 0}
          </div>
          <div className="text-lg mb-2 text-gray-700">
            Total Engagement: {metrics.page_post_engagements?.[0]?.value || 0}
          </div>
          <div className="text-lg mb-2 text-gray-700">
            Total Impressions: {metrics.page_impressions?.[0]?.value || 0}
          </div>
          <div className="text-lg text-gray-700">
            Total Reactions:{" "}
            {metrics.page_actions_post_reactions_total?.[0]?.value?.like || 0}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
