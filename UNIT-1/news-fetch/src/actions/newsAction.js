export const fetchNewsRequest = () => ({ type: "FETCH_NEWS_REQUEST" });
export const fetchNewsSuccess = (articles) => ({
  type: "FETCH_NEWS_SUCCESS",
  payload: articles,
});
export const fetchNewsFailure = (error) => ({
  type: "FETCH_NEWS_FAILURE",
  payload: error,
});
