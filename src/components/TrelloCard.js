import React from "react";

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
        marginBottom: '8px',
        whiteSpace: 'normal'        // card 줄바꿈 처리
    }
}

export default TrelloCard;