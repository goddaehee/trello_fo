import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux";

import TrelloCard from "./TrelloCard";
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

import { Popover } from '@material-ui/core';
import { Droppable } from "react-beautiful-dnd";

import axios from "axios";

const TrelloList = (props) => {

  let [addCardOpen, setAddCardOpen] = useState(false);
  let [addCardTitle, setAddCardTitle] = useState('');

  let [listTitleOpen, setListTitleOpen] = useState(false);
  let [listTitle, setListTitle] = useState(props.reducerData.workListTitle);

  let [moveListOpen, setMoveListOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const popoverOpen = Boolean(anchorEl);
  const popoverId = popoverOpen ? 'simple-popover' : undefined;

  let dispatch = useDispatch();

  const addInputState = (type) => {   // onBlur처리 되었을 때 실행

    if (type === "list") {
      setListTitleOpen(false); // list 제목 update창 닫기

      if (listTitle !== props.reducerData.workListTitle) {      // 만약 list 제목이 변경된 상태로 blur되었다면 dispatch 처리해주기

        axios.put('http://localhost:8088/list/' + props.reducerData.workListId,
          {
            "workListTitle": listTitle
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        ).then(response => {
          if (response.status === 200) {
            dispatch({ type: "modListTitle", payload: [response.data, listTitle] });
          }
        });
      }
    } else if (type === "card") {
      if (addCardTitle === "") {
        return false;
      }
      setAddCardOpen(false);

      axios.post('http://localhost:8088/card',
        {
          "cardTitle": addCardTitle,
          "workListId": props.reducerData.workListId
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      ).then(response => {
        if (response.status === 200) {
          dispatch({ type: "addCard", payload: response.data });
        }
      });
    }
  };

  const copyList = () => {
    dispatch({ type: "copyList", payload: [props.reducerData.workListId] });
  }

  const moveList = () => {
    dispatch({ type: "moveList", payload: [props.index + 1, Number(document.getElementById("selectPosition").value)] });
  }

  useEffect(() => {
    setListTitle(props.reducerData.workListTitle);
  }, [props.reducerData]);

  return (
    <Droppable droppableId={String(props.reducerData.workListId)}>
      {(provided) => (
        <div style={styles.container} {...provided.droppableProps} ref={provided.innerRef}>
          {
            listTitleOpen === false
              ? <div>
                <div style={styles.containerHeader} onClick={() => setListTitleOpen(true)}>
                  <b>{props.reducerData.workListTitle}</b>
                </div>
                <MenuIcon className="menuIcon" style={styles.menuIcon}
                  aria-describedby={popoverId} variant="contained" onClick={handleClick} />
                <Popover
                  id={popoverId}
                  open={popoverOpen}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}>

                  {
                    moveListOpen === false
                      ? <div style={styles.popupContainer}>
                        <div style={styles.popupHeader}>
                          List actions
                          <CloseIcon onClick={handleClose} style={{ "float": "right", "cursor": "pointer" }} />
                        </div>
                        <div style={styles.popupBody} className="popupBody">
                          <ul>
                            <li onClick={() => { setAddCardOpen(true); handleClose(); }}>Add card...</li>
                            <li onClick={(e) => { copyList(e); handleClose(); }}>Copy list...</li>
                            <li onClick={() => { setMoveListOpen(true) }}>Move list...</li>
                          </ul>
                        </div>
                      </div>
                      : <div style={styles.popupContainer}>
                        <div style={styles.popupHeader}>
                          Move list
                          <CloseIcon onClick={() => { handleClose(); setTimeout(() => { setMoveListOpen(false) }, 500) }} style={{ "float": "right", "cursor": "pointer" }} />
                        </div>
                        <div style={styles.popupBody} className="popupBody">
                          <div style={{ "display": "flex" }}>
                            <div>Position</div>
                            <div style={{ "flexGrow": "2" }}></div>
                            <select id="selectPosition" style={styles.selectBox}>
                              {
                                props.reducerData.map((item, index) => {
                                  return (
                                    <React.Fragment key={index}>
                                      <option>{index + 1}</option>
                                    </React.Fragment>
                                  )
                                })
                              }
                            </select>
                          </div>
                          <button onClick={() => { moveList(); handleClose(); setTimeout(() => { setMoveListOpen(false) }, 500) }}>Move</button>
                        </div>
                      </div>
                  }
                </Popover>
              </div>
              : <textarea className="listTitleTextarea" value={listTitle}
                onChange={(e) => setListTitle(e.target.value)}
                onBlur={() => addInputState("list")}
                autoFocus
                onFocus={(e) => e.currentTarget.select()} />
          }


          {
            <div style={styles.list}>

              {
                props.reducerData.cardList && props.reducerData.cardList.map((item, index) => {
                  return (
                    <div key={index}>
                      <TrelloCard cardInfo={item} index={index} />
                    </div>
                  )
                })
              }
              {
                addCardOpen === false
                  ? <div className="addCard" onClick={() => { setAddCardOpen(true); }} >+ Add a card</div>
                  : <div className="addCardInput">
                    <textarea onChange={(e) => setAddCardTitle(e.target.value)} placeholder="Enter a title for this card…"></textarea>
                    <button onClick={() => addInputState("card")} >Add Card</button>
                    <button onClick={() => { setAddCardOpen(false); }}>Close</button>
                  </div>
              }
            </div>
          }
          {provided.placeholder}
        </div>
      )}

    </Droppable>
  )
}

const styles = {
  container: {
    backgroundColor: "#ccc",
    borderRadius: 3,
    width: 250,
    padding: 8,
    margin: 8,
    display: 'inline-block',
    verticalAlign: 'top',
    cursor: "pointer"
  },
  list: {
    marginTop: '8px',
    marginBottom: '8px',
    clear: 'both'
  },
  menuIcon: {
    float: "right",
    color: "#000",
    opacity: "0.5"
  },
  containerHeader: {
    float: 'left',
    width: '85%'
  },

  popupContainer: {
    zIndex: '1',
    width: '200px',
    height: '300px',
    backgroundColor: '#eee',
    borderRadius: '3px',
    padding: '3px'
  },
  popupHeader: {
    textAlign: 'center',
    borderBottom: '1px solid #ccc',
    padding: '10px'

  },
  popupBody: {
    borderBottom: '1px solid #ccc',
    padding: '10px'
  },
  selectBox: {
    width: '85px',
    height: '25px',

  }
}


export default TrelloList;