import { combineReducers } from "redux";

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

    console.log(action.payload[0]);
    console.log(action.payload[1]);

    [copy[action.payload[0]], copy[action.payload[1]]]
      = [copy[action.payload[1]], copy[action.payload[0]]];

    console.log(copy[action.payload[0]].workListId);
    console.log(copy[action.payload[1]].workListId);

    return copy;
  } else if (action.type === 'copyList') {
    let copy = [...state];
    let temp = copy[action.payload];

    copy.splice(action.payload, 0, temp);
    console.log(copy);
    return copy;

  } else if (action.type === 'dragList') {
    let copy = [...state];

    const splicedItem = copy.splice(action.payload[0], 1);
    copy.splice(action.payload[1], 0, ...splicedItem);
    // db에서는 옮길 요소의 work_list_ordr를 옮겨질 요소와 그 옆의 인덱스 요소의 절반값으로 변경

    return copy;

  } else {
    return state;
  }
}

export default combineReducers({ reducer });