import api from "../api";
import { VIDEOS_BY_CATEGORY_FETCHED } from "../constants/action_types";

const videosByCategoryFetched = (data, categoryId) => ({
  type: VIDEOS_BY_CATEGORY_FETCHED,
  categoryId,
  data
});

export const fetchByCategoryId = categoryId => dispatch =>
  api.videos.fetchByCategory(categoryId).then(data => {
    dispatch(videosByCategoryFetched(data, categoryId));
  });

export const getByCategoryId = (state, categoryId) => [];
