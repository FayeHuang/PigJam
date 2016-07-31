// redux reducers
import { combineReducers } from 'redux'
import moment from 'moment';
import {
  REQUEST_DIRECTIONS, 
  RECEIVE_DIRECTIONS,

  CHANGE_DEPARTURE_DATE,
  CHANGE_BEGIN_TIME,
  CHANGE_END_TIME,
  CHANGE_ORIGIN_PLACE,
  CHANGE_DESTINATION_PLACE,
  EXCHANGE_ORIGIN_DESTINATION
} from '../actions'


function directions(state = {
  isFetching: false,
  data: {}
}, action) {
  switch (action.type) {
    case REQUEST_DIRECTIONS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_DIRECTIONS:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.data
      })
    default:
      return state
  }
}

function ui(state = {
  // date: moment().format("YYYYMMDD"),
  // beginTime: moment().format("HHmm"),
  // endTime: moment().add(2, 'hours').format("HHmm"),
  date: moment(),
  beginTime: moment(),
  endTime: moment().add(4, 'hours'),
  origin: "台北市信義區信義路五段7號",
  destination: "台北市信義區市府路1號"
}, action) {
  switch (action.type) {
    case CHANGE_DEPARTURE_DATE:
      return Object.assign({}, state, {
        date: action.date
      })
    case CHANGE_BEGIN_TIME:
      return Object.assign({}, state, {
        beginTime: action.time,
        endTime: moment(action.time).add(4, 'hours')
      })
    case CHANGE_END_TIME:
      return Object.assign({}, state, {
        endTime: action.time
      })
    case CHANGE_ORIGIN_PLACE:
      return Object.assign({}, state, {
        origin: action.place
      })
    case CHANGE_DESTINATION_PLACE:
      return Object.assign({}, state, {
        destination: action.place
      })
    case EXCHANGE_ORIGIN_DESTINATION:
      return Object.assign({}, state, {
        origin: action.destination,
        destination: action.origin
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  directions,
  ui
})

export default rootReducer