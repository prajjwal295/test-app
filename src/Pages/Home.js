import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import Page from "./Page";

const Home = () => {
  const [user, setUser] = useState(null);
  const [pages, setPages] = useState([]);
  const [selectedPageId, setSelectedPageId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const fetchPages = async (accessToken) => {
        try {
          const result = await axios.get(
            `https://graph.facebook.com/me/accounts?access_token=${accessToken}`
          );
          setPages(result.data.data);
        } catch (error) {
          console.error("Error fetching pages", error);
        }
      };

      fetchPages(user.accessToken);
    }
  }, [user]);

  const handlePageChange = (event) => {
    setSelectedPageId(event.target.value);
  };

  const selectedPage = pages.find((page) => page.id === selectedPageId);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      {!user ? (
        <Login setUser={setUser} />
      ) : (
        <div className=" flex flex-col gap-6 items-center bg-white p-8 rounded-lg shadow-md">
          <div className="w-32 h-32 rounded-full overflow-hidden">
            <img
              src={user.picture}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-3xl font-bold text-blue-600">{user.name}</h1>
          <select
            onChange={handlePageChange}
            value={selectedPageId || ""}
            className="bg-blue-600 text-white p-2 rounded-md"
          >
            <option value="" disabled={true} className="bg-gray-100">
              Select a Page
            </option>
            {pages.map((page) => (
              <option
                key={page.id}
                value={page.id}
                className="bg-white text-black"
              >
                {page.name}
              </option>
            ))}
          </select>
          {selectedPage && (
            <Page
              accessToken={selectedPage.access_token}
              pageId={selectedPage.id}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
