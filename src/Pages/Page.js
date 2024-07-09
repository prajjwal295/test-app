import React, { useState, useEffect } from "react";
import axios from "axios";

const Page = ({ accessToken, pageId }) => {
  const [metrics, setMetrics] = useState({});

  console.log({ accessToken });
  console.log({ pageId });

  const fetchMetrics = async () => {
    const since = "2024-07-01";
    const until = "2024-07-10";
    const period = "total_over_range";

    try {
      // Use the insights endpoint to fetch metrics
      const result = await axios.get(
        `https://graph.facebook.com/v20.0/${pageId}/insights?metric=page_post_engagements,page_fans,page_impressions,page_actions_post_reactions_total
  &access_token=${accessToken}`,
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
      console.log({ pageId });
      fetchMetrics();
    }
  }, [pageId]);

  return (
    <div className="flex flex-col items-center gap-4 justify-center">
      <div className="text-xl font-bold">Card Information</div>
      <p className="font-semibold">(Implementing, "since" and "until" and `period=total_over_range`)</p>
      {metrics && (
        <div className="border-2 border-solid-black p-5">
          <div>Total Followers: {metrics.page_fans[0].value}</div>
          <div>Total Engagement: {metrics.page_post_engagements[0].value}</div>
          <div>Total Impressions: {metrics.page_impressions[0].value}</div>
          <div>
            Total Reactions:{" "}
            {metrics?.page_actions_post_reactions_total?.value?.[0]?.value || 0}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
