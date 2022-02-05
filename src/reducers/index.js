import { combineReducers } from "redux";

const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear().toString();

    let month = date.getMonth() + 1;
    month = month < 10 ? '0' + month.toString() : month.toString();

    let day = date.getDate();
    day = day < 10 ? '0' + day.toString() : day.toString();

    return year + "-" + month + "-" + day ;
}


let list = [
    { 
        WORK_LIST_ID: 1,
        WORK_LIST_TITLE: "첫번째 리스트", 
        WORK_LIST_ORD: 1,
        USE_YN: 1,
        REG_ID: "배찬",
        REG_DTIME: "2022-02-04",
        MOD_ID: "배찬",
        MOD_DTIME: "2022-02-04"
    },{ 
        WORK_LIST_ID: 2,
        WORK_LIST_TITLE: "두번째 리스트", 
        WORK_LIST_ORD: 2,
        USE_YN: 1,
        REG_ID: "배찬2",
        REG_DTIME: "2022-02-04",
        MOD_ID: "배찬2",
        MOD_DTIME: "2022-02-04"
    },
];

let card = [
    {
        CARD_ID: 1,
        WORK_LIST_ID: 1,
        CARD_TITLE: "첫번째 카드",
        CARD_DESC: "첫번째 카드 설명",
        CARD_ORD: 1,
        USE_YN: 1,
        REG_ID: "배찬",
        REG_DTIME: "2022-02-04",
        MOD_ID: "배찬",
        MOD_DTIME: "2022-02-04"
    },{
        CARD_ID: 2,
        WORK_LIST_ID: 2,
        CARD_TITLE: "두번째 카드",
        CARD_DESC: "두번째 카드 설명",
        CARD_ORD: 1,
        USE_YN: 1,
        REG_ID: "배찬",
        REG_DTIME: "2022-02-04",
        MOD_ID: "배찬",
        MOD_DTIME: "2022-02-04"
    },{
        CARD_ID: 3,
        WORK_LIST_ID: 2,
        CARD_TITLE: "세번째 카드",
        CARD_DESC: "세번째 카드 설명",
        CARD_ORD: 2,
        USE_YN: 1,
        REG_ID: "배찬",
        REG_DTIME: "2022-02-05",
        MOD_ID: "배찬",
        MOD_DTIME: "2022-02-05"
    }
]



function listReducer(state = list, action){
    if(action.type === 'addList'){
        
        let copy = [...state];
        copy.push({ 
            WORK_LIST_ID: copy[copy.length-1].WORK_LIST_ID + 1,
            WORK_LIST_TITLE: action.payload, 
            WORK_LIST_ORD: copy[copy.length-1].WORK_LIST_ORD + 1,
            USE_YN: 1,
            REG_ID: "배찬",
            REG_DTIME: getCurrentDate(),
            MOD_ID: "배찬",
            MOD_DTIME: getCurrentDate()
        });
        return copy;
    }else{
        return state;
    }
    
}

function cardReducer(state = card, action){
    if(action.type === 'addCard'){

        let copy = [...state];
        copy.push({
            CARD_ID: copy[copy.length-1].CARD_ID + 1,
            WORK_LIST_ID: action.payload[1],
            CARD_TITLE: action.payload[0],
            CARD_DESC: "추가된 카드 설명",
            CARD_ORD: copy[copy.length-1].CARD_ORD + 1,
            USE_YN: 1,
            REG_ID: "배찬",
            REG_DTIME: getCurrentDate(),
            MOD_ID: "배찬",
            MOD_DTIME: getCurrentDate()
        });
        return copy;
    }else{
        return state;
    }
}

 

export default combineReducers({listReducer,cardReducer});