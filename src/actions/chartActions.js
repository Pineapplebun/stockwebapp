import { FETCH_CHART, CHART_OPTIONS, SELECT_STOCK } from './types';

export const fetchChart = (queryData) => dispatch => {
  fetch(`http://localhost:3000/watchlist/${queryData.symbol}?start=${queryData.minDate}&end=${queryData.maxDate}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw response.error;
      }
    })
    .then(json => {
      console.log(json);
      dispatch({
        type: FETCH_CHART,
        payload1: json.stockData,
        payload2: json.newsData,
      })
    })
    .catch(error => console.log(error));
}

export const updateOptions = (updateData) => {
  return function (dispatch) {
    dispatch({
      type: CHART_OPTIONS,
      payload: updateData,
    });
  }
}

export const selectStock = (selectStock) => {
  console.log(selectStock);
  return function (dispatch) {
    dispatch({
      type: SELECT_STOCK,
      payload: selectStock,
    });
  }
}
