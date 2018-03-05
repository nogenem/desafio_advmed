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

export default function videos(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}
