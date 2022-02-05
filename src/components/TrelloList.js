import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";

import TrelloCard from "./TrelloCard";

const TrelloList = (props) =>{

    const cardReducer = useSelector( (state) => state.cardReducer);

    let [addCardOpen,addCardOpenUpdate] = useState(false);
    let [addCardInput,addCardInputUpdate] = useState('');
    
    let dispatch = useDispatch();

    return(
        <div style={styles.container}>
            <span><b>{props.listInfo.WORK_LIST_TITLE}</b></span>
            <div style={styles.list}>
                {
                    cardReducer.map( (item,index) => {
                        return(
                            <>
                            {
                                props.listInfo.WORK_LIST_ID === cardReducer[index].WORK_LIST_ID
                                ? <TrelloCard cardInfo={cardReducer[index]} key={index}/>
                                : null
                            }
                            </>
                        )
                    })
                }
                {
                addCardOpen === false
                ? <div className="add_card" onClick={ () => { addCardOpenUpdate(true); }} >+ Add a card</div>
                : <div className="add_card_input">
                    <textarea onChange={ (e) => addCardInputUpdate(e.target.value) } placeholder="Enter a title for this card…"></textarea>
                    <button onClick={ () => {

                        if(addCardInput === ""){
                            return false;
                        }

                        dispatch({type:'addCard', payload: [addCardInput,props.listInfo.WORK_LIST_ID]});
                        addCardOpenUpdate(false); 
                        addCardInputUpdate('');

                    }}>Add Card</button>
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