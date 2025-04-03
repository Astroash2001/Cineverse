const API_KEY = "d0b901b09ac6be9564861fc3551a8306";
const BASE_URL = "https://api.themoviedb.org/3/";

export const getPopularMovies = async () => {
  const response = await fetch(
    `${BASE_URL}movie/popular?api_key=${API_KEY}`

    //we send the reuqest to the base url and tell
    //  it to fetch the required data in this case
    //  the popular movies and then we also send
    //  our api key to authenticate the request
  );

  const data = await response.json();
  return data.results;
};

export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}`
  );

  const data = await response.json();
  return data.results;
};
