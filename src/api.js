import axios from "axios";

import categories from "./constants/categories";

/*
  Vale ressaltar que fazer as chamadas para a API do google diretamente do front-end
  não é uma boa opção já que a API_KEY fica visível para todos tanto no código como 
  na requisição para a API em si. 

  A melhor forma de tratar isso seria fazendo as requisições via um servidor próprio
  ou colocando o domínio do site na whitelist da API do google.
*/
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
      axios.get(getSearchUrl(categoryId)).then(res => res.data),
    fetchById: videoId => axios.get(getVideoUrl(videoId)).then(res => res.data)
  }
};
