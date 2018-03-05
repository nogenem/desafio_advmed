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
