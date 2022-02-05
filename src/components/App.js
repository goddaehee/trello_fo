import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import '../index.css';
import TrelloList from "./TrelloList";

function App() {

const listReducer = useSelector( (state) => state.listReducer);

let [addListOpen,addListOpenUpdate] = useState(false);
let [addListInput,addListInputUpdate] = useState('');

let dispatch = useDispatch();

  return (
    <div className="App" style={{ whiteSpace: "nowrap"}}>
      <header>
        
      </header>
      <div className="Contents" >

        <span> 
          {
            listReducer.map( (item,index) => {
              return(
                <TrelloList listInfo={item} key={index}/>
              )
            })
          }
        </span>

        {
          addListOpen === false
          ? <div className="add_list" onClick={ () => { addListOpenUpdate(true); }} >+ Add another list</div>
          : <div className="add_list_input">
              <input type='text' onChange={ (e) => addListInputUpdate(e.target.value) } placeholder="Enter list title..."></input>
              <button onClick={ () => {

                  if(addListInput === ""){
                    return false;
                  }

                  dispatch({type:'addList', payload: addListInput});

                  addListOpenUpdate(false); 
                  addListInputUpdate('');

                  setTimeout(() => {
                    window.scrollTo(50000,0);
                  },0)

              }}>Add list</button>
              <button onClick={ () => {addListOpenUpdate(false); addListInputUpdate('');}}>닫기</button>
            </div>
        }

      </div>
      
    </div>
      
  );
}

export default App;
