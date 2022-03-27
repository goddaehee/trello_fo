import React, {  useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";

import TrelloCard from "./TrelloCard";
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

import { Popover } from '@material-ui/core';
import { Droppable } from "react-beautiful-dnd";

const TrelloList = (props) =>{

    const listReducer = useSelector( (state) => state.listReducer);
    const cardReducer = useSelector( (state) => state.cardReducer);

    let [addCardOpen,addCardOpenUpdate] = useState(false);
    let [addCardTitle,addCardTitleUpdate] = useState('');
    
    let [listTitleOpen,listTitleOpenUpdate] = useState(false);
    let [listTitle,listTitleUpdate] = useState(listReducer[props.index].WORK_LIST_TITLE);

    let [moveListOpen,moveListOpenUpdate] = useState(false);

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
        
        if(type === "list"){
            listTitleOpenUpdate(false); // list 제목 update창 닫기

            if(listTitle !== props.listInfo.WORK_LIST_TITLE){      // 만약 list 제목이 변경된 상태로 blur되었다면 dispatch 처리해주기
                console.log("list dispatch 발생");
                dispatch({type:"updateListTitle", payload: [listTitle,listReducer[props.index].WORK_LIST_ID]});
            }
        }else if(type === "card"){
            if(addCardTitle === ""){
                return false;
            }
            addCardOpenUpdate(false);
            
            console.log("card dispatch 발생");
            dispatch({type:'addCard', payload: [addCardTitle,props.listInfo.WORK_LIST_ID]});
            
        }
    };

    const copyList = () => {
        dispatch({type:"copyList", payload: [props.listInfo.WORK_LIST_ID]});
    }

    const moveList = () =>{
        dispatch({type:"moveList", payload: [props.index+1, Number(document.getElementById("selectPosition").value)]});
    }


    useEffect( () => {
        listTitleUpdate(listReducer[props.index].WORK_LIST_TITLE);
    }, [listReducer]);

    return(
        <Droppable draggableId={String(props.listInfo.WORK_LIST_ID)}>
            { (provided) => (
                <div style={styles.container} {...provided.droppableProps} ref={provided.innerRef}>
                {
                    listTitleOpen === false
                    ? <div>
                        <div style={styles.containerHeader} onClick={ () => listTitleOpenUpdate(true) }>
                            <b>{listReducer[props.index].WORK_LIST_TITLE}</b>
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
                                        <CloseIcon onClick={handleClose} style={{"float":"right", "cursor":"pointer"}}/>
                                    </div>
                                    <div style={styles.popupBody} className="popupBody">
                                        <ul>
                                            <li onClick={ () => { addCardOpenUpdate(true); handleClose();}}>Add card...</li>
                                            <li onClick={ (e) => { copyList(e); handleClose();}}>Copy list...</li>
                                            <li onClick={ () => { moveListOpenUpdate(true) }}>Move list...</li>
                                        </ul>
                                    </div>
                                </div>
                                : <div style={styles.popupContainer}>
                                    <div style={styles.popupHeader}>
                                        Move list
                                        <CloseIcon onClick={ () => {handleClose(); setTimeout(() => {moveListOpenUpdate(false)},500)}} style={{"float":"right", "cursor":"pointer"}}/>
                                    </div>
                                    <div style={styles.popupBody} className="popupBody">
                                        <div style={{"display":"flex"}}>
                                            <div>Position</div>
                                            <div style={{"flexGrow":"2"}}></div>
                                            <select id="selectPosition" style={styles.selectBox}>
                                                {
                                                    listReducer.map( (item,index) => {
                                                        return(
                                                            <React.Fragment key={index}>
                                                                <option>{index+1}</option>
                                                            </React.Fragment>
                                                        )
                                                    }) 
                                                }
                                            </select>
                                        </div>
                                        <button onClick={ () => {moveList(); handleClose(); setTimeout(() => {moveListOpenUpdate(false)},500)} }>Move</button>
                                    </div>
                                </div>   
                            }
                        </Popover>
                    </div>
                    : <textarea className="list_title_textarea" value={listTitle} 
                        onChange={ (e) => listTitleUpdate(e.target.value) }
                        onBlur={ () => addInputState("list") } 
                        autoFocus 
                        onFocus={(e) => e.currentTarget.select()} />
                }
                

                <div style={styles.list}>
                    {
                        cardReducer.map( (item,index) => {
                            return(
                                <div key={index}>
                                    {
                                        props.listInfo.WORK_LIST_ID === item.WORK_LIST_ID
                                        ? <TrelloCard cardInfo={item} index={index}/>
                                        : null
                                    }
                                </div>
                            )
                        })
                    }
                    {
                    addCardOpen === false
                    ? <div className="add_card" onClick={ () => { addCardOpenUpdate(true); }} >+ Add a card</div>
                    : <div className="add_card_input">
                        <textarea onChange={ (e) => addCardTitleUpdate(e.target.value) } placeholder="Enter a title for this card…"></textarea>
                        <button onClick={ () => addInputState("card") } >Add Card</button>
                        <button onClick={ () => {addCardOpenUpdate(false);}}>Close</button>
                    </div>
                    }
                </div>
                {provided.placeholder}
            </div>
            )}
            
        </Droppable>
    )
}

const styles= {
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
        float:"right", 
        color:"#000",
        opacity: "0.5"
    },
    containerHeader: {
        float: 'left',
        width:'85%'
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
        padding:'10px'
        
    },
    popupBody: {
        borderBottom: '1px solid #ccc',
        padding:'10px'
    },
    selectBox: {
        width: '85px',
        height:'25px',
        
    }
}


export default TrelloList;