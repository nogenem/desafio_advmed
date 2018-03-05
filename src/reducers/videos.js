import { createSelector } from "reselect";

import { VIDEOS_BY_CATEGORY_FETCHED } from "../constants/action_types";

/*
state = {
  "category_id": [
    {
      id: "",
      url: "",
      title: "",
      short_description: "",
      full_description: "",
      thumbnails: {
        "medium": ""
      }, (maybe?)
      views_num: XXX,
      likes: XXX,
      dislikes: XXX (maybe?)
    },
    ...
  ],
  ...
}
*/
export const INITIAL_STATE = {};

const reshapeByCategoryData = (data, categoryId) => {
  const result = data.items.map(({ id, snippet }) => ({
    id: id.videoId,
    url: `https://www.youtube.com/watch?v=${id.videoId}`,
    title: snippet.title,
    // o end-point '/search' retorna apenas a descrição
    // com um numero máximo de caracteres e adiciona
    // '...' após este numero máximo
    short_description: snippet.description,
    thumbnails: {
      medium: snippet.thumbnails.medium.url
    }
  }));
  return {
    [categoryId]: result
  };
};

export default function videos(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case VIDEOS_BY_CATEGORY_FETCHED:
      return {
        ...state,
        ...reshapeByCategoryData(action.data, action.categoryId)
      };
    default:
      return state;
  }
}

/* Seletores */

// Só tem um reducer, logo a store inteira possui os dados
// do reducer 'videos'
export const getVideosHash = state => state || {};
const getCategoryId = (state, categoryId) => categoryId;
export const getByCategoryId = createSelector(
  getVideosHash,
  getCategoryId,
  (videosHash, categoryId) => videosHash[categoryId] || []
);
