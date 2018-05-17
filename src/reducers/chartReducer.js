import { FETCH_CHART, CHART_OPTIONS, SELECT_STOCK } from '../actions/types';

const initialState = {
  chartData: [],
  newsData: [],
  selectStock: '',
  chartOptions: {
    XAxisKey: 'time',
    YAxisKey: 'volume',
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_CHART:
      return {
        ...state,
        chartData: action.payload1,
        newsData: action.payload2,
      };
    case CHART_OPTIONS:
      return {
        ...state,
        chartOptions: action.payload,
      };
    case SELECT_STOCK:
      return {
        ...state,
        selectStock: action.payload,
      };
    default:
      return state;
  }
}
