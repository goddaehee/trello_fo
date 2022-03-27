import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import '../index.css';
import TrelloList from "./TrelloList";
import {DragDropContext} from "react-beautiful-dnd";

function App() {

const listReducer = useSelector( (state) => state.listReducer);

let [addListOpen,addListOpenUpdate] = useState(false);
let [addListTitle,addListTitleUpdate] = useState('');

let dispatch = useDispatch();

  return (
    <div className="App" style={{ whiteSpace: "nowrap"}}>
      <header>
        
      </header>
      <DragDropContext>
      <div className="Contents">

          {
            listReducer.map( (item,index) => {
              return(
                    <TrelloList listInfo={listReducer[index]} index={index} key={index}/>
              )
            })
          }
        

        {
          addListOpen === false
          ? <div className="add_list" onClick={ () => { addListOpenUpdate(true); }} >+ Add another list</div>
          : <div className="add_list_input">
              <input type='text' onChange={ (e) => addListTitleUpdate(e.target.value) } placeholder="Enter list title..."></input>
              <button onClick={ () => {

                  if(addListTitle === ""){
                    return false;
                  } 

                  dispatch({type:'addList', payload: addListTitle});  

                  addListOpenUpdate(false); 
                  addListTitleUpdate('');

                  setTimeout(() => {
                    window.scrollTo(50000,0);
                  },0)

              }}>Add list</button>
              <button onClick={ () => {addListOpenUpdate(false); addListTitleUpdate('');}}>Close</button>
            </div>
        }
      </div>
      </DragDropContext>
    </div>
      
  );
}

export default App;
