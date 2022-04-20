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


let list = [
  {
    workListId: 1,
    workListTitle: "첫번째 리스트",
    workListOrd: 1,
    useYn: 1,
    regId: "배찬",
    regDtime: "2022-02-04",
    modId: "배찬",
    modDtime: "2022-02-04"
  }, {
    workListId: 2,
    workListTitle: "두번째 리스트",
    workListOrd: 1001,
    useYn: 1,
    regId: "배찬2",
    regDtime: "2022-02-04",
    modId: "배찬2",
    modDtime: "2022-02-04"
  }, {
    workListId: 3,
    workListTitle: "세번째 리스트",
    workListOrd: 2001,
    useYn: 1,
    regId: "배찬3",
    regDtime: "2022-03-13",
    modId: "배찬3",
    modDtime: "2022-03-13"
  },
];

let card = [
  {
    cardId: 1,
    workListId: 1,
    cardTitle: "첫번째 카드",
    cardDesc: "첫번째 카드 설명",
    cardOrd: 1,
    useYn: 1,
    regId: "배찬",
    regDtime: "2022-02-04",
    modId: "배찬",
    modDtime: "2022-02-04"
  }, {
    cardId: 2,
    workListId: 2,
    cardTitle: "두번째 카드",
    cardDesc: "두번째 카드 설명",
    cardOrd: 1001,
    useYn: 1,
    regId: "배찬",
    regDtime: "2022-02-04",
    modId: "배찬",
    modDtime: "2022-02-04"
  }, {
    cardId: 3,
    workListId: 2,
    cardTitle: "세번째 카드",
    cardDesc: "세번째 카드 설명",
    cardOrd: 2001,
    useYn: 1,
    regId: "배찬",
    regDtime: "2022-02-05",
    modId: "배찬",
    modDtime: "2022-02-05"
  }, {
    cardId: 4,
    workListId: 3,
    cardTitle: "4번째 카드",
    cardDesc: "4번째 카드 설명",
    cardOrd: 3001,
    useYn: 1,
    regId: "배찬",
    regDtime: "2022-03-13",
    modId: "배찬",
    modDtime: "2022-03-13"
  }
];

let initialState = [];

let dataInfo = {
  listLength: list.length
};

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

  } else {
    return state;
  }
}


// function listReducer(state = list, action) {

//   if (action.type === 'addList') {

//     let copy = [...state];
//     copy.push({
//       workListId: copy[copy.length - 1].workListId + 1,     //  이 부분은 ai로 처리해야할듯
//       workListTitle: action.payload,
//       workListOrd: copy[copy.length - 1].workListOrd + 1000,   //  이 부분은 ai로 처리해야할듯
//       useYn: 1,
//       regId: "배찬",
//       regDtime: getCurrentDate(),
//       modId: "배찬",
//       modDtime: getCurrentDate()
//     });
//     console.log(copy);
//     return copy;

//   } else if (action.type === 'updateListTitle') {

//     let copy = [...state];

//     copy.forEach((element) => {
//       if (element.workListId === action.payload[1]) {
//         element.workListTitle = action.payload[0];
//         element.modId = "배찬";
//         element.modDtime = getCurrentDate();
//       }
//     });

//     console.log(copy);
//     return copy;

//   } else if (action.type === 'copyList') {

//     let copy = [...state];
//     let copiedTitle = "";
//     let copiedOrd = 0;


//     copy.forEach((element, index) => {

//       if (element.workListId === action.payload) {
//         copiedTitle = element.workListTitle;
//         copiedOrd = index + 2;
//       }
//     });

//     copy.push({
//       workListId: copy[copy.length - 1].workListId + 1,
//       workListTitle: copiedTitle,
//       workListOrd: copiedOrd,
//       useYn: 1,
//       regId: "배찬",
//       regDtime: getCurrentDate(),
//       modId: "배찬",
//       modDtime: getCurrentDate()
//     });

//   } else if (action.type === 'moveList') {
//     let copy = [...state];
//     let temp = "";

//     console.log("기본값 :" + action.payload[0]);
//     console.log("변경값 :" + action.payload[1]);

//     copy.forEach((element, index) => {
//       console.log(index);

//       if (copy[index].workListOrd === action.payload[0]) {
//         copy[index].workListOrd = action.payload[1];
//         console.log("변경전");
//         console.log(copy[index]);
//       } else if (copy[index].workListOrd === action.payload[1]) {
//         copy[index].workListOrd = action.payload[0];
//         console.log("변경후");
//         console.log(copy[index]);
//       }
//     });

//     temp = copy[action.payload[0] - 1];
//     copy[action.payload[0] - 1] = copy[action.payload[1] - 1];
//     copy[action.payload[1] - 1] = temp;

//     return copy;
//   } else {
//     return state;
//   }

// }

function cardReducer(state = card, action) {
  if (action.type === 'addCard') {

    let copy = [...state];
    copy.push({
      cardId: copy[copy.length - 1].cardId + 1,
      workListId: action.payload[1],
      cardTitle: action.payload[0],
      cardDesc: "추가된 카드 설명",
      cardOrd: copy[copy.length - 1].cardOrd + 1,
      useYn: 1,
      regId: "배찬",
      regDtime: getCurrentDate(),
      modId: "배찬",
      modDtime: getCurrentDate()
    });

    console.log(copy);
    return copy;

  } else if (action.type === 'updateCardTitle') {

    let copy = [...state];

    let updateCardItem = copy[action.payload[1] - 1];

    updateCardItem.cardTitle = action.payload[0];
    updateCardItem.modId = "배찬";
    updateCardItem.modDtime = getCurrentDate();

    console.log(copy);
    return copy;

  } else {
    return state;
  }
}

function infoReducer(state = dataInfo, action) {
  return state;
}


export default combineReducers({ infoReducer, reducer });