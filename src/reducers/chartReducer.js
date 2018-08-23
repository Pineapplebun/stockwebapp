import { FETCH_CHART, CHART_OPTIONS, SELECT_STOCK, SELECT_SIDE_FRAME_CARD } from '../actions/types';

const initialState = {
  stockData: [],
  newsData: [],
  selectStock: '',
  selectSideFrameCard: 'Sign In',
  chartOptions: {
    XAxisKey: 'time',
    YAxisKey: 'volume',
  }
};

/* Never mutating state, simply return a new state object */
export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_CHART:
      return {
        ...state,
        stockData: action.payload1,
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
    case SELECT_SIDE_FRAME_CARD:
      return {
        ...state,
        selectSideFrameCard: action.payload,
      }
    default:
      return state;
  }
}
