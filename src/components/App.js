import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import '../index.css';
import TrelloList from "./TrelloList";
import { DragDropContext } from "react-beautiful-dnd";
import axios from "axios";

function App() {

  const reducer = useSelector((state) => state.reducer);

  let [addListOpen, setAddListOpen] = useState(false);
  let [addListTitle, setAddListTitle] = useState('');

  let dispatch = useDispatch();

  useEffect(() => {
    axios.get('http://localhost:8088/list').then(response => {
      const data = response.data;
      dispatch({ type: "getList", payload: data });
    });


  }, [])

  return (
    <div className="App" style={{ whiteSpace: "nowrap" }}>
      <header>

      </header>
      <DragDropContext>
        <div className="Contents">

          {
            reducer.map((item, index) => {
              return (
                <TrelloList reducerData={reducer[index]} index={index} key={index} />
              )
            })
          }
          {
            addListOpen === false
              ? <div className="addList" onClick={() => { setAddListOpen(true); }} >+ Add another list</div>
              : <div className="addListInput">
                <input type='text' onChange={(e) => setAddListTitle(e.target.value)} placeholder="Enter list title..."></input>
                <button onClick={() => {

                  if (addListTitle === "") {
                    return false;

                  } else {
                    axios.post('http://localhost:8088/list',
                      encodeURIComponent(addListTitle),
                      {
                        headers: {
                          'Content-Type': 'application/text'
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
      </DragDropContext>
    </div>

  );
}

export default App;
