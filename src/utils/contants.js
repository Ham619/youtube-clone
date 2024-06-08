// constants.js
// Load environment variables
// require('dotenv').config();

// Ensure the GOOGLE_API_KEY environment variable is set
const GOOGLE_API_KEY = "AIzaSyDpOm-WCUMhpNNdwDlvc5PX5qEJw6oZlzU";

export const LIVE_CHAT_COUNT = 25;

// YouTube API Endpoints
export const YOUTUBE_VIDEOS_API = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=50&regionCode=IN&key=${GOOGLE_API_KEY}`;

export const YOUTUBE_SEARCH_API = `https://www.googleapis.com/youtube/v3/search?key=${GOOGLE_API_KEY}&type=video&part=snippet&maxResults=10&q=`;
