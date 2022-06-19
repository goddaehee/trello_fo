import { combineReducers } from "redux";
import axios from "axios";

const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear().toString();

  let month = date.getMonth() + 1;
  month = month < 10 ? '0' + month.toString() : month.toString();

  let day = date.getDate();
  day = day < 10 ? '0' + day.toString() : day.toString();

  return year + "-" + month + "-" + day;
}

let initialState = [];

function reducer(state = initialState, action) {
  if (action.type === 'getList') {
    let copy = [...state];
    copy = action.payload;
    console.log("-----------------");
    console.log(copy);
    return copy;

  } else if (action.type === 'addList') {
    let copy = [...state];
    copy.push(action.payload);
    return copy;

  } else if (action.type === 'modListTitle') {
    let copy = [...state];

    copy.forEach((element) => {
      if (element.workListId === action.payload.workListId) {
        element.workListTitle = action.payload.workListTitle;
      }
    });
    return copy;

  } else if (action.type === 'addCard') {
    let copy = [...state];

    copy.forEach((element) => {
      if (element.workListId === action.payload.workListId) {
        element.cardList.push(action.payload);
      }
    });

    return copy;

  } else if (action.type === 'modCardTitle') {
    let copy = [...state];

    copy.forEach((element) => {
      if (element.workListId === action.payload[0].workListId) {

        element.cardList.forEach((card) => {
          if (card.cardId === action.payload[0].cardId) {
            card.cardTitle = action.payload[1];
          }
        });
      }
    });
    return copy;

  } else if (action.type === 'moveList') {
    let copy = [...state];


    [copy[action.payload[0]], copy[action.payload[1]]]
      = [copy[action.payload[1]], copy[action.payload[0]]];


    return copy;
  } else if (action.type === 'copyList') {
    let copy = [...state];

    // 추가된 list 객체 데이터 새로 return 받기
    console.log(copy);
    copy.push(action.payload);

    copy.sort((a, b) => a.workListOrd - b.workListOrd);
    console.log(copy);
    return copy;

  } else if (action.type === 'dragList') {
    let copy = [...state];

    copy[action.payload[0]].workListOrd = action.payload[1];

    copy.sort((a, b) => a.workListOrd - b.workListOrd);
    console.log(copy);

    return copy;

  } else {
    return state;
  }
}

export default combineReducers({ reducer });