import api from "../api";
import {
  VIDEOS_BY_CATEGORY_FETCHED,
  VIDEO_BY_ID_FETCHED
} from "../constants/action_types";

const videosByCategoryFetched = (data, categoryId) => ({
  type: VIDEOS_BY_CATEGORY_FETCHED,
  categoryId,
  data
});

const videoByIdFetched = (data, categoryId, videoId) => ({
  type: VIDEO_BY_ID_FETCHED,
  categoryId,
  videoId,
  data
});

export const fetchVideosByCategoryId = categoryId => dispatch =>
  api.videos.fetchByCategory(categoryId).then(data => {
    dispatch(videosByCategoryFetched(data, categoryId));
  });

export const fetchVideoById = (categoryId, videoId) => dispatch =>
  api.videos.fetchById(videoId).then(data => {
    dispatch(videoByIdFetched(data, categoryId, videoId));
  });
