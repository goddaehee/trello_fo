import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import { Draggable } from "react-beautiful-dnd";

import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';

import CloseIcon from '@material-ui/icons/Close';

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

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    
    return(
        <>
            <Draggable draggableId={String(props.cardInfo.CARD_ID)} index={props.index}>
                {(provided) => 
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    {
                        cardTitleOpen === false
                        ? <Card style={styles.card} onMouseEnter={ () => iconUpdate(true) } 
                                onMouseLeave={ () => iconUpdate(false)} 
                                onClick={handleClickOpen} >
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
                    </div>
                }
            
            </Draggable>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth={true}
                maxWidth={'md'}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {cardTitle}
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom >
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.

Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.

Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.
                    </Typography>
                </DialogContent>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        Activity
                    </Typography>
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </BootstrapDialog>
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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };  

  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };
export default TrelloCard;