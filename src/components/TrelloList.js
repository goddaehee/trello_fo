import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";

import TrelloCard from "./TrelloCard";

const TrelloList = (props) =>{

    const cardReducer = useSelector( (state) => state.cardReducer);

    let [addCardOpen,addCardOpenUpdate] = useState(false);
    let [addCardInput,addCardInputUpdate] = useState('');
    
    let [listTitleOpen,listTitleOpenUpdate] = useState(false);
    let [listTitleInput,listTitleInputUpdate] = useState(props.listInfo.WORK_LIST_TITLE);

    let dispatch = useDispatch();

    const addInputState = (type) => {   // onBlur처리 되었을 때 실행
        
        if(type === "list"){
            listTitleOpenUpdate(false); // list 제목 update창 닫기

            if(listTitleInput !== props.listInfo.WORK_LIST_TITLE){      // 만약 list 제목이 변경된 상태로 blur되었다면 dispatch 처리해주기
                dispatch({type:"updateListTitle", payload: [listTitleInput,props.listInfo.WORK_LIST_ID]});
                console.log("list dispatch 발생");
            }
        }else if(type === "card"){
            if(addCardInput === ""){
                return false;
            }
            addCardOpenUpdate(false);
            addCardInputUpdate('');
            dispatch({type:'addCard', payload: [addCardInput,props.listInfo.WORK_LIST_ID]});
            console.log("card dispatch 발생");
        }
    }

    return(
        <div style={styles.container}>
            
            {
                listTitleOpen === false
                ? <div onClick={ () => listTitleOpenUpdate(true)}><b>{listTitleInput}</b></div>
                : <textarea className="list_title_textarea" value={listTitleInput} 
                    onChange={ (e) => listTitleInputUpdate(e.target.value) }
                    onBlur={ () => addInputState("list") } />
            }
            
            
            <div style={styles.list}>
                {
                    cardReducer.map( (item,index) => {
                        return(
                            <div key={index}>
                                {
                                    props.listInfo.WORK_LIST_ID === cardReducer[index].WORK_LIST_ID
                                    ? <TrelloCard cardInfo={cardReducer[index]} />
                                    : null
                                }
                            </div>
                        )
                    })
                }
                {
                addCardOpen === false
                ? <div className="add_card" onClick={ () => { addCardOpenUpdate(true); }} >+ Add a card</div>
                : <div className="add_card_input">
                    <textarea onChange={ (e) => addCardInputUpdate(e.target.value) } placeholder="Enter a title for this card…"></textarea>
                    <button onClick={ () => addInputState("card") } >Add Card</button>
                    <button onClick={ () => {addCardOpenUpdate(false); addCardInputUpdate('');}}>닫기</button>
                    </div>
                }
            </div>
        </div>
    )
}

const styles= {
    container: {
        backgroundColor: "#ccc",
        borderRadius: 3,
        width: 250,
        padding: 8,
        margin: 8,
        display: 'inline-block',
        verticalAlign: 'top'
    },
    list: {
        marginTop: '8px',
        marginBottom: '8px'
    }
}




export default TrelloList;