// Head.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import {  YOUTUBE_SEARCH_API } from "../utils/contants";
import { cacheResults } from "../utils/searchSlice";
import VideoContainer from "./VideoContainer";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState("");

  const searchCache = useSelector((state) => state.search);
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchQuery) {
      const cachedSuggestions = searchCache[searchQuery];
      if (cachedSuggestions) {
        setSuggestions(cachedSuggestions);
      } else {
        getSearchSuggestions();
      }
    }
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    try {
      const response = await fetch(`${YOUTUBE_SEARCH_API}${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      const suggestionsList = data.items.map(item => item.snippet.title);
      setSuggestions(suggestionsList);

      // Cache the results
      dispatch(cacheResults({ [searchQuery]: suggestionsList }));
    } catch (error) {
      console.error("Error fetching search suggestions:", error);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSelectedQuery(suggestion);
    setShowSuggestions(false);
  };

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  return (
    <div>
      <div className="grid grid-flow-col p-5 m-2 shadow-lg">
        <div className="flex col-span-1">
          <img
            onClick={toggleMenuHandler}
            className="h-8 cursor-pointer"
            alt="menu"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAARVBMVEX///8jHyAgHB0OBQgMAAWlpKQpJSaenZ309PUAAAAIAAD8/Pz5+fna2tqop6dvbW1oZmevrq4tKivFxMQYExRiYGC+vr7Dc4WrAAABB0lEQVR4nO3cS3LCMBAFQGIIIBPbhN/9jxqSyiIsTUnlydB9g1eSNV5MvdUKAAAAAAAAAAAAAAAAXtEwvscwDk3yHabSb2Loy/TRIOHUv8XRH+sHHMrSqR6U+hd1jHSE90P8lHC2/Lc0/0vzMy3WMdynxaFBwu+Jv4uh0cQHAAAAAAAAAIB59jG0ijdcT9sYTtcmK0PncumiuJRz/YD7bbf0ut4f3br+GvQt2PblrXrC3WbpUA/6sXrC/GeY/zvM/5aGmofHZiu0S//M/GoVDwAAAAAAAAAAZsjeuRerN1HL7hPy95fm76DNnzD/Lc3/0rxAJ3v+Xn0AAAAAAAAAAAAAAAD4T74AYhs1O+vt3ioAAAAASUVORK5CYII="
          />
          <a href="/">
            <img
              className="h-8 mx-2"
              alt="youtube-logo"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/2560px-YouTube_Logo_2017.svg.png"
            />
          </a>
        </div>
        <div className="col-span-10 px-10">
          <div>
            <input
              className="px-5 w-1/2 border border-gray-400 p-2 rounded-l-full"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setShowSuggestions(false)}
            />
            <button
              className="border border-gray-400 px-5 py-2 rounded-r-full bg-gray-100"
              onClick={() => handleSuggestionClick(searchQuery)}
            >
              🔍
            </button>
          </div>
          {showSuggestions && searchQuery && (
            <div className="fixed bg-white py-2 px-2 w-[37rem] shadow-lg rounded-lg border border-gray-100">
              <ul>
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="py-2 px-3 shadow-sm hover:bg-gray-100 cursor-pointer"
                    onMouseDown={() => handleSuggestionClick(suggestion)} // Use onMouseDown to avoid issues with onBlur
                  >
                    🔍 {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="col-span-1">
          <img
            className="h-8"
            alt="user"
            src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
          />
        </div>
      </div>

      {/* Display videos based on the selected query */}
      {selectedQuery && <VideoContainer searchQuery={selectedQuery} />}
    </div>
  );
};

export default Head;
