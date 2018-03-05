export const fetchByCategoryId = categoryId => dispatch =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve([]);
    }, 1000);
  });

export const getByCategoryId = (state, categoryId) => [];
