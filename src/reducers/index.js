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
        WORK_LIST_ORD: 1001,
        USE_YN: 1,
        REG_ID: "배찬2",
        REG_DTIME: "2022-02-04",
        MOD_ID: "배찬2",
        MOD_DTIME: "2022-02-04"
    },{ 
        WORK_LIST_ID: 3,
        WORK_LIST_TITLE: "세번째 리스트", 
        WORK_LIST_ORD: 2001,
        USE_YN: 1,
        REG_ID: "배찬3",
        REG_DTIME: "2022-03-13",
        MOD_ID: "배찬3",
        MOD_DTIME: "2022-03-13"
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
        CARD_ORD: 1001,
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
        CARD_ORD: 2001,
        USE_YN: 1,
        REG_ID: "배찬",
        REG_DTIME: "2022-02-05",
        MOD_ID: "배찬",
        MOD_DTIME: "2022-02-05"
    },{
        CARD_ID: 4,
        WORK_LIST_ID: 3,
        CARD_TITLE: "4번째 카드",
        CARD_DESC: "4번째 카드 설명",
        CARD_ORD: 3001,
        USE_YN: 1,
        REG_ID: "배찬",
        REG_DTIME: "2022-03-13",
        MOD_ID: "배찬",
        MOD_DTIME: "2022-03-13"
    }
];


let dataInfo = {
    listLength : list.length
};

function listReducer(state = list, action){
    if(action.type === 'addList'){

        let copy = [...state];
        copy.push({ 
            WORK_LIST_ID: copy[copy.length-1].WORK_LIST_ID + 1,     //  이 부분은 ai로 처리해야할듯
            WORK_LIST_TITLE: action.payload, 
            WORK_LIST_ORD: copy[copy.length-1].WORK_LIST_ORD + 1000,   //  이 부분은 ai로 처리해야할듯
            USE_YN: 1,
            REG_ID: "배찬",
            REG_DTIME: getCurrentDate(),
            MOD_ID: "배찬",
            MOD_DTIME: getCurrentDate()
        });

        console.log(copy);
        return copy;
        
    }else if(action.type === 'updateListTitle'){
        
        let copy = [...state];

        copy.forEach( (element) => {
            if(element.WORK_LIST_ID === action.payload[1]){
                element.WORK_LIST_TITLE = action.payload[0];
                element.MOD_ID = "배찬";
                element.MOD_DTIME = getCurrentDate();
            }
        });
        
        // let updateListItem = copy[action.payload[1]-1];

        // updateListItem.WORK_LIST_TITLE = action.payload[0];
        // updateListItem.MOD_ID = "배찬";
        // updateListItem.MOD_DTIME = getCurrentDate();
        
        console.log(copy);
        return copy;

    }else if(action.type === 'copyList'){
        
        let copy = [...state];
        let copiedTitle = "";
        let copiedOrd = 0;


        copy.forEach((element,index) => {

            if(element.WORK_LIST_ID  === action.payload){
                copiedTitle = element.WORK_LIST_TITLE;
                copiedOrd = index+2;
            }
        });
        
        copy.push({ 
            WORK_LIST_ID: copy[copy.length-1].WORK_LIST_ID + 1,
            WORK_LIST_TITLE: copiedTitle,
            WORK_LIST_ORD: copiedOrd,
            USE_YN: 1,
            REG_ID: "배찬",
            REG_DTIME: getCurrentDate(),
            MOD_ID: "배찬",
            MOD_DTIME: getCurrentDate()
        });

    }else if(action.type === 'moveList'){
        let copy = [...state];
        let temp = "";

        console.log("기본값 :" + action.payload[0]);
        console.log("변경값 :" + action.payload[1]);

        copy.forEach((element,index) => {
            console.log(index);

            if(copy[index].WORK_LIST_ORD === action.payload[0]){
                copy[index].WORK_LIST_ORD = action.payload[1];
                console.log("변경전");
                console.log(copy[index]);
            }else if(copy[index].WORK_LIST_ORD === action.payload[1]){
                copy[index].WORK_LIST_ORD = action.payload[0];
                console.log("변경후");
                console.log(copy[index]);
            }
        });

        temp = copy[action.payload[0]-1];
        copy[action.payload[0]-1] = copy[action.payload[1]-1];
        copy[action.payload[1]-1] = temp;

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

        console.log(copy);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
        return copy;

    }else if(action.type === 'updateCardTitle'){
        
        let copy = [...state];

        let updateCardItem = copy[action.payload[1]-1];

        updateCardItem.CARD_TITLE = action.payload[0];
        updateCardItem.MOD_ID = "배찬";
        updateCardItem.MOD_DTIME = getCurrentDate();
        
        console.log(copy);
        return copy;

    }else{
        return state;
    }
}

function infoReducer(state = dataInfo, action){
    return state;
}


export default combineReducers({listReducer,cardReducer,infoReducer});