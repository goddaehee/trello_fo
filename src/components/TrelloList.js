import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import TrelloCard from "./TrelloCard";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";

import { Popover } from "@material-ui/core";
import axios from "axios";
import { Draggable } from "react-beautiful-dnd";

const TrelloList = (props) => {

  let [addCardOpen, setAddCardOpen] = useState(false);
  let [addCardTitle, setAddCardTitle] = useState("");

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
  const popoverId = popoverOpen ? "simple-popover" : undefined;

  let dispatch = useDispatch();

  const addInputState = (type) => {
    // onBlur처리 되었을 때 실행

    if (type === "list") {
      setListTitleOpen(false); // list 제목 update창 닫기

      if (listTitle !== props.reducerData.workListTitle) {
        // 만약 list 제목이 변경된 상태로 blur되었다면 dispatch 처리해주기

        axios
          .put(
            "https://43.200.85.188:8080/list/" + props.reducerData.workListId,
            {
              workListTitle: listTitle,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            if (response.status === 200) {
              dispatch({ type: "modListTitle", payload: response.data });
            }
          }).catch((error) => {
            console.log(error.response);
          });
      }
    } else if (type === "card") {
      if (addCardTitle === "") {
        return false;
      }
      setAddCardOpen(false);

      axios
        .post(
          "https://43.200.85.188:8080/card",
          {
            cardTitle: addCardTitle,
            workListId: props.reducerData.workListId
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            dispatch({ type: "addCard", payload: response.data });
          }
        }).catch((error) => {
          console.log(error.response);
        });
    }
  };

  const copyList = () => {
    console.log(props);

    let newOrder = 0;
    if (props.index === props.totalList.length - 1) {
      newOrder = props.reducerData.workListOrd + 1000;
    } else {
      newOrder = Math.floor((props.reducerData.workListOrd + props.totalList[props.index + 1].workListOrd) / 2);
    }

    axios
      .post(
        "https://43.200.85.188:8080/list/copy/" + props.reducerData.workListId,
        newOrder,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          // 깊은 복사 ( 얕은 복사 하니까 복사된 객체를 변경해도 복사한 객체도 변경됨 )
          response.data.cardList = JSON.parse(JSON.stringify(props.reducerData.cardList));

          response.data.cardList.forEach((card) => {
            card.workListId = response.data.workListId;
          });

          dispatch({ type: "copyList", payload: response.data });
        }
      }).catch((error) => {
        alert("리스트 복사를 실패하였습니다.");
        console.log(error.response);
      });
  }

  const moveList = () => {
    dispatch({ type: "moveList", payload: [props.index, Number(document.getElementById("selectPosition").value - 1)] });
  }

  useEffect(() => {
    setListTitle(props.reducerData.workListTitle);
  }, [props.reducerData]);

  return (
    <div style={styles.container} >
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
                        <li onClick={() => { copyList(); handleClose(); }}>Copy list...</li>
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
                            props.totalList.map((item, index) => {
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
      <div style={styles.list}>
        {
          props.reducerData.cardList && props.reducerData.cardList.map((item, index) => {
            return (
              <Draggable draggableId={"card" + index} index={index} key={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}>
                    <TrelloCard cardInfo={item} />
                  </div>
                )}
              </Draggable>
            )
          })
        }
      </div>
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
  )
}

const styles = {
  container: {
    backgroundColor: "#ccc",
    borderRadius: 3,
    width: 250,
    padding: 8,
    margin: 8,
    display: "inline-block",
    verticalAlign: "top",
    cursor: "pointer",
  },
  list: {
    marginTop: "8px",
    marginBottom: "8px",
    clear: "both",
  },
  menuIcon: {
    float: "right",
    color: "#000",
    opacity: "0.5",
  },
  containerHeader: {
    float: "left",
    width: "85%",
  },

  popupContainer: {
    zIndex: "1",
    width: "200px",
    height: "300px",
    backgroundColor: "#eee",
    borderRadius: "3px",
    padding: "3px",
  },
  popupHeader: {
    textAlign: "center",
    borderBottom: "1px solid #ccc",
    padding: "10px",
  },
  popupBody: {
    borderBottom: "1px solid #ccc",
    padding: "10px",
  },
  selectBox: {
    width: "85px",
    height: "25px",
  },
};

export default TrelloList;
