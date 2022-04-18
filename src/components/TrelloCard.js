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

  let [icon, setIcon] = useState(false);

  let [cardTitle, setCardTitle] = useState(props.cardInfo.cardTitle);
  let [cardTitleOpen, setCardTitleOpen] = useState(false);

  let dispatch = useDispatch();

  const onClickSave = () => {

    setCardTitleOpen(false);

    if (cardTitle !== props.cardInfo.cardTitle) {
      console.log("카드 타이틀 수정 dispatch 발생");
      dispatch({ type: "updateCardTitle", payload: [cardTitle, props.cardInfo.cardId] });
    }
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [dialogDiscriptionTextareaOpen, setDialogDiscriptionTextareaOpen] = useState(false);
  const [dialogActivityTextareaOpen, setDialogActivityTextareaOpen] = useState(false);

  const handleInputTextarea = (e) => {

    {
      e.currentTarget.value !== ""
        ? setDialogActivityTextareaOpen(true)
        : setDialogActivityTextareaOpen(false);
    }

    e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
    e.currentTarget.parentElement.style.height = e.currentTarget.scrollHeight + "px";

  }


  return (
    <>
      <Draggable draggableId={String(props.cardInfo.cardId)} index={props.index}>
        {(provided) =>
          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            {
              cardTitleOpen === false
                ? <Card style={styles.card} onMouseEnter={() => setIcon(true)}
                  onMouseLeave={() => setIcon(false)}
                  onClick={handleClickOpen} >
                  <Typography gutterBottom style={{ display: "inline" }}>
                    {cardTitle}
                  </Typography>
                  {icon === true && <EditIcon style={{ float: "right", color: "#bbb" }} onClick={(event) => { setCardTitleOpen(true); event.stopPropagation(); }}></EditIcon>}
                </Card>
                : <div className="addCardInput">
                  <textarea onChange={(e) => { setCardTitle(e.target.value) }} value={cardTitle}
                    autoFocus
                    onFocus={(e) => e.currentTarget.select()} />
                  <button onClick={onClickSave}>Save</button>
                  <button onClick={() => { setCardTitleOpen(false); setCardTitle(props.cardInfo.cardTitle) }}>Close</button>
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
        <DialogContent dividers className="dialogContent">
          <div>
            <div className="flex-container">
              <h3>Discription</h3>
              {
                dialogDiscriptionTextareaOpen === false
                  ? <button style={{ margin: "15px 5px" }} onClick={() => setDialogDiscriptionTextareaOpen(true)}>Edit</button>
                  : ""
              }
            </div>
            <div>
              {
                dialogDiscriptionTextareaOpen === false
                  ?
                  <div className="dialog-description-view" onClick={() => setDialogDiscriptionTextareaOpen(true)}>
                    Add a more detailed description...
                  </div>
                  :
                  <div>
                    <textarea className="dialog-description-textarea" placeholder="Add a more detailed description..."
                      autoFocus
                      onBlur={() => setDialogDiscriptionTextareaOpen(false)}>

                    </textarea>
                    <button>Save</button>
                  </div>
              }
            </div>
          </div>
        </DialogContent>
        <DialogContent dividers className="dialogContent">
          <div>
            <div className="flex-container">
              <h3>Activity</h3>
            </div>
            <div className="dialog-activity-box">
              <textarea className="dialog-activity-textarea" placeholder="Write a comment..."
                onInput={(event) => { handleInputTextarea(event) }}>

              </textarea>
            </div>
            {
              dialogActivityTextareaOpen === true
                ? <button>Save</button>
                : <button disabled style={{ opacity: "0.5", cursor: "not-allowed" }}>Save</button>
            }
          </div>
        </DialogContent>
        <DialogActions>

        </DialogActions>
      </BootstrapDialog>
    </>
  )
}

const styles = {
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