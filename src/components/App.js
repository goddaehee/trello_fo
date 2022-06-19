import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import "../index.css";
import TrelloList from "./TrelloList";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

function App() {
  const reducer = useSelector((state) => state.reducer);

  let [addListOpen, setAddListOpen] = useState(false);
  let [addListTitle, setAddListTitle] = useState("");

  let dispatch = useDispatch();

  useEffect(() => {
    axios.get("https://43.200.85.188:8080/list").then((response) => {
      console.log(response.status);
      const data = response.data;
      dispatch({ type: "getList", payload: data });
    });
  }, []);

  // const { isLoading, error, data, isFetching } = useQuery("repoData", () =>
  //   axios.get("https://43.200.85.188:8080/list").then((response) => {
  //     // const data = response.data;
  //     // dispatch({ type: "getList", payload: data });
  //     console.log(response);
  //     return response.data;
  //   })
  // );

  // if (isLoading) return "Loading...,..................";
  // if (error) return "An error has occurred: " + error.message;

  const dragStyle = (isDragging, draggableStyle) => ({
    verticalAlign: 'top',
    background: isDragging ? 'blue' : 'none',
    borderRadius: 3,
    ...draggableStyle
  });

  const onDragEndList = (dropResult) => {

    if (!dropResult.destination) {
      return false;
    } else {

      let newOrder = 0;
      console.log(dropResult);

      if (dropResult.destination.index === reducer.length - 1) {
        // 맨 뒤로 드랍
        newOrder = reducer[dropResult.destination.index].workListOrd + 1000;

      } else if (dropResult.destination.index === 0) {
        // 맨 앞으로 드랍
        newOrder = Math.floor(reducer[0].workListOrd / 2)

      } else {
        if (dropResult.source.index < dropResult.destination.index) {
          newOrder = Math.floor((reducer[dropResult.destination.index].workListOrd + reducer[dropResult.destination.index + 1].workListOrd) / 2);
        } else if (dropResult.source.index > dropResult.destination.index) {
          newOrder = Math.floor((reducer[dropResult.destination.index - 1].workListOrd + reducer[dropResult.destination.index].workListOrd) / 2);
        } else {
          // 아무 일도 일어나지 않음
          return false;
        }

      }
      axios
        .put(
          "https://43.200.85.188:8080/list/move/" + reducer[dropResult.source.index].workListId,
          newOrder,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            dispatch({ type: "dragList", payload: [dropResult.source.index, newOrder] });
          } else {
            console.log(response.status);
          }
        }).catch((error) => {
          console.log("에러가 발생하였습니다.", error.response);
        });

    }
  };

  return (
    <div className="app" style={{ whiteSpace: "nowrap" }}>
      <header>

      </header>
      <div className="contents">
        <DragDropContext onDragEnd={onDragEndList}>
          <Droppable droppableId="contents-list" direction="horizontal">
            {(provided) => (
              <div
                className="contents-list"
                {...provided.droppableProps}
                ref={provided.innerRef}>
                {
                  reducer.map((item, index) => {
                    return (
                      <Draggable draggableId={"list" + index} key={index} index={index}>
                        {(provided, snapshot) => (
                          <div className="drag-item"
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            style={dragStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <DragDropContext>
                              <Droppable droppableId="contents-card">
                                {(provided) => (
                                  <div
                                    className="contents-card"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                  >
                                    <TrelloList reducerData={reducer[index]}
                                      index={index}
                                      totalList={reducer} />
                                    {provided.placeholder}
                                  </div>
                                )}
                              </Droppable>
                            </DragDropContext>
                          </div>
                        )}
                      </Draggable>
                    )
                  })
                }
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {
          addListOpen === false
            ? <div className="addList" onClick={() => { setAddListOpen(true); }} >+ Add another list</div>
            : <div className="addListInput">
              <input type='text' onChange={(e) => setAddListTitle(e.target.value)} placeholder="Enter list title..."></input>
              <button onClick={() => {

                if (addListTitle === "") {
                  return false;

                } else {
                  axios.post('https://43.200.85.188:8080/list',
                    {
                      workListTitle: encodeURIComponent(addListTitle)
                    },
                    {
                      headers: {
                        'Content-Type': 'application/json'
                      }
                    }
                  ).then(response => {
                    if (response.status === 200) {
                      dispatch({ type: "addList", payload: response.data });
                    }
                  });

                  setAddListOpen(false);
                  setAddListTitle('');

                  setTimeout(() => {
                    window.scrollTo(50000, 0);
                  }, 0)
                }
              }}>Add list</button>
              <button onClick={() => { setAddListOpen(false); setAddListTitle(''); }}>Close</button>
            </div>
        }
      </div>
    </div>
  );
}

export default App;
