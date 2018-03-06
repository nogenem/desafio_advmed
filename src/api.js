import categories from "./constants/categories";

const getSearchUrl = categoryId =>
  `https://www.googleapis.com/youtube/v3/search?part=id,snippet&type=video&maxResults=50&q=${
    categories[categoryId].title
  }&key=${process.env.REACT_APP_API_KEY}`;

const getVideoUrl = videoId =>
  `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${
    process.env.REACT_APP_API_KEY
  }`;

export default {
  videos: {
    fetchByCategory: categoryId =>
      fetch(getSearchUrl(categoryId)).then(data => data.json()),
    fetchById: videoId => fetch(getVideoUrl(videoId)).then(data => data.json())
  }
};
