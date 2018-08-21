import { FETCH_CHART, CHART_OPTIONS, SELECT_STOCK, SELECT_SIDE_FRAME_CARD } from './types';

export const fetchChart = (queryData) => dispatch => {
  let fetchOptions = { method: 'GET', credentials: 'same-origin', cache: 'no-cache'};
  fetch(window.location.host + `${queryData.symbol}?start=${queryData.minDate}&end=${queryData.maxDate}`, fetchOptions)
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

export const selectStock = (stock) => {
  console.log(stock);
  return function (dispatch) {
    dispatch({
      type: SELECT_STOCK,
      payload: stock,
    });
  }
}

export const selectSideFrameCard = (sideFrameCard) => {
  console.log(sideFrameCard);
  return function (dispatch) {
    dispatch({
      type: SELECT_SIDE_FRAME_CARD,
      payload: sideFrameCard,
    })
  }
}
