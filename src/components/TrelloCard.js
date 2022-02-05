import React from "react";
import { useSelector } from "react-redux";

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

const TrelloCard = (props) => {

    return(
        <Card style={styles.card}>
            <Typography gutterBottom>
                {props.cardInfo.CARD_TITLE}
            </Typography>
        </Card>
    )
}

const styles= {
    card: {
        marginTop: '8px',
        marginBottom: '8px'
    }
}

export default TrelloCard;