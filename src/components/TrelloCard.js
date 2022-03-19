import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';

const TrelloCard = (props) => {

    let [icon,iconUpdate] = useState(false);

    let [cardTitle,cardTitleUpdate] = useState(props.cardInfo.CARD_TITLE);
    let [cardTitleOpen,cardTitleOpenUpdate] = useState(false);

    let dispatch = useDispatch();

    const onClickSave = () => {
        
        cardTitleOpenUpdate(false);

        if(cardTitle !== props.cardInfo.CARD_TITLE){
            console.log("카드 타이틀 수정 dispatch 발생");
            dispatch({type: "updateCardTitle", payload: [cardTitle,props.cardInfo.CARD_ID]});
        }
    }

    return(
        <>
        {
            cardTitleOpen === false
            ? <Card style={styles.card} onMouseEnter={ () => iconUpdate(true) } onMouseLeave={ () => iconUpdate(false)} >
                <Typography gutterBottom style={{display:"inline"}}>
                    {cardTitle}
                </Typography>
                { icon === true && <EditIcon style={{float:"right", color:"#bbb"}} onClick={()=>cardTitleOpenUpdate(true)}></EditIcon> }
              </Card>
            : <div className="add_card_input">
                <textarea onChange={ (e) => {cardTitleUpdate(e.target.value)} }value={cardTitle} 
                autoFocus 
                onFocus={(e) => e.currentTarget.select()} />
                <button onClick={ onClickSave }>Save</button>
                <button onClick={ () => {cardTitleOpenUpdate(false); cardTitleUpdate(props.cardInfo.CARD_TITLE)}}>Close</button>
              </div>
        }
        </>
    )
}

const styles= {
    card: {
        marginTop: '8px',
        marginBottom: '8px',
        whiteSpace: 'normal'        // card 줄바꿈 처리
    }
}

export default TrelloCard;