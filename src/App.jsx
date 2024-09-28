import React from "react";
import { useState } from "react";
import "./App.css";
import { GoCheckCircleFill } from "react-icons/go";
import { TiDelete } from "react-icons/ti";
import { useRef } from "react";
// import { useEffect } from "react";
const todoKey="ReactTodo";


function App() {
  const [inputValue, setInputValue] = useState({});
  const [task, setTask] = useState(()=>{
    const rawTodo=localStorage.getItem(todoKey);
    if(!rawTodo) return [];
    return JSON.parse(rawTodo);
  });
  const buttonRef = useRef(null);
  // const [currDate, setCurrDate] = useState();


// ENTER BUTTON FUNCTIONALITY
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      buttonRef.current.click();
    }
  };

  //ADD ITEM IN TODO

  const handleClick = () => {
    const {id,content,checked}=inputValue;
    if (!content) return;
    
    // if (task.includes(inputValue)) {
    //   setInputValue("");
    //   return;
    // }

    const ifContentMatched=task.find((currElem)=>currElem.content==content);
    if(ifContentMatched){
      setInputValue({id:"",content:"",checked});
    return;
    }
    setTask((prevTask) => [...prevTask, {id,content,checked}]);
    setInputValue({id:"",content:"",checked});
  };
  const handleChange = (value) => {
    
    setInputValue({id:value,content:value,checked:false});
  
  };
 

  //todo delete functon

  const handleDeleteTodo = (deleteElem) => {
    const updateTask = task.filter((currElem) => currElem !== deleteElem);
    setTask(updateTask);
    
  };
  const handleAllDelete = () => {
    setTask([]);
  };

  console.log(task);

  
//DATE TIME
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const now = new Date();
  //     const formatdate = now.toLocaleDateString();
  //     const formattime = now.toLocaleTimeString();
  //     setCurrDate(`${formatdate} ${formattime}`);
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);
const handleCheck=(value)=>{
  
  const updateTask=task.map((something)=>{
if(something==value){
  return{...something,checked:!something.checked}
}
else{
  return something;
}
  });
  setTask(updateTask);
}
//local storage
localStorage.setItem(todoKey,JSON.stringify(task));

  return (
    <div className="container">
      <header className="heading">
        <h1>Todo List </h1>
      </header>

      {/* <div className="date-time">{currDate}</div> */}

      <div className="main">
          
          <input
          type="text"
          onKeyPress={handleKeyPress}
          placeholder="Enter text"
          value={inputValue.content}
          onChange={(e)=>handleChange(e.target.value)}
        />
        <button ref={buttonRef} onClick={handleClick}>
          Add Task
        </button>
        
 
      </div>
      <ul className="list-container">
        {task.map((currElem) => {
          return (
            <li className="list" key={currElem.id}>
              <div className={currElem.checked?'check-task':'task'}>
                {currElem.content}
                <div className="btn">
                  <GoCheckCircleFill onClick={()=>handleCheck(currElem)} className="check" />
                  <TiDelete
                    className="delete"
                    onClick={() => handleDeleteTodo(currElem)}
                  />
                </div>
              </div>
            </li>
          );
        })}
        <button onClick={handleAllDelete} className="clear-all">
          Clear All
        </button>
      </ul>
    </div>
  );
}

export default App;
