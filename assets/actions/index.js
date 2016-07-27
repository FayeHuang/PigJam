import fetch from 'isomorphic-fetch';
// redux actions
//
// ===== Async Actions =====
//
export const REQUEST_DIRECTIONS = 'REQUEST_DIRECTIONS'
export const RECEIVE_DIRECTIONS = 'RECEIVE_DIRECTIONS'

function requestDirections() {
  return {
    type: REQUEST_DIRECTIONS
  }
}

function receiveDirections(json) {
  return {
    type: RECEIVE_DIRECTIONS,
    data: json
  }
}

export function fetchDirections(origin, destination, date, beginTime, endTime) {
  let url = 'https://google-map-directions-fayehuang.c9users.io/api/directions?origin=' + origin + '&destination=' + destination + '&begin_time=' + date + beginTime + '&end_time=' + date + endTime
  return dispatch => {
    dispatch(requestDirections())
    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(receiveDirections(json)))
  }
}
//
// ===== UI Actions =====
//
export const CHANGE_DEPARTURE_DATE = 'CHANGE_DEPARTURE_DATE'
export const CHANGE_BEGIN_TIME = 'CHANGE_BEGIN_TIME'
export const CHANGE_END_TIME = 'CHANGE_END_TIME'
export const CHANGE_ORIGIN_PLACE = 'CHANGE_ORIGIN_PLACE'
export const CHANGE_DESTINATION_PLACE = 'CHANGE_DESTINATION_PLACE'


export function changeDepartureDate(date) {
  return {
    type: CHANGE_DEPARTURE_DATE,
    date: date
  }
}

export function changeBeginTime(time) {
  return {
    type: CHANGE_BEGIN_TIME,
    time: time
  }
}

export function changeEndTime(time) {
  return {
    type: CHANGE_END_TIME,
    time: time
  }
}

export function changeOriginPlace(place) {
  return {
    type: CHANGE_ORIGIN_PLACE,
    place: place
  }
}

export function changeDestinationPlace(place) {
  return {
    type: CHANGE_DESTINATION_PLACE,
    place: place
  }
}
