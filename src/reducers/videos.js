import { createSelector } from "reselect";

import {
  VIDEOS_BY_CATEGORY_FETCHED,
  VIDEO_BY_ID_FETCHED
} from "../constants/action_types";

/*
state = {
  "category_id": {
    "video_id": {
      id: "",
      url: "",
      title: "",
      short_description: "",
      full_description: "",
      thumbnails: {
        "medium": ""
      }, (maybe?)
      views: XXX,
      likes: XXX,
      dislikes: XXX (maybe?)
    },
    ...
  },
  ...
}
*/
export const INITIAL_STATE = {};

const reshapeByCategoryData = (data, categoryId) => {
  const result = {};

  data.items.forEach(({ id, snippet }) => {
    result[id.videoId] = {
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
    };
  });

  return {
    [categoryId]: result
  };
};

const reshapeByIdData = ({ items }) => ({
  full_description: items[0].snippet.description,
  thumbnails: {
    high: items[0].snippet.thumbnails.high.url
  },
  views: items[0].statistics.viewCount,
  likes: items[0].statistics.likeCount,
  dislikes: items[0].statistics.dislikeCount
});

export default function videos(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case VIDEOS_BY_CATEGORY_FETCHED:
      return {
        ...state,
        ...reshapeByCategoryData(action.data, action.categoryId)
      };
    case VIDEO_BY_ID_FETCHED: {
      const video = state[action.categoryId][action.videoId];
      const thumbnailMedium = video.thumbnails.medium;
      Object.assign(video, reshapeByIdData(action.data));
      video.thumbnails.medium = thumbnailMedium;

      const newState = { ...state };
      newState[action.categoryId][action.videoId] = { ...video };
      return newState;
    }
    default:
      return state;
  }
}

/* Seletores */

// Só tem um reducer, logo a store inteira possui os dados
// do reducer 'videos'
const getCategoryId = (state, categoryId) => categoryId;
const getVideoId = (state, categoryId, videoId) => videoId;

export const getVideosHash = state => state || {};
export const getVideosByCategoryId = createSelector(
  getVideosHash,
  getCategoryId,
  (videosHash, categoryId) => Object.values(videosHash[categoryId] || [])
);
export const isCategoryLoaded = createSelector(
  getVideosHash,
  getCategoryId,
  (videosHash, categoryId) => !!videosHash[categoryId]
);
export const getVideoById = createSelector(
  getVideosHash,
  getCategoryId,
  getVideoId,
  (videosHash, categoryId, videoId) => {
    const tmp = videosHash[categoryId];
    if (!tmp) return {};
    return tmp[videoId] || {};
  }
);
