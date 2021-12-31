import React, {useEffect, useState} from 'react';
import { getAuth, signOut } from "@firebase/auth";
import CreateTask from '../modals/CreateTask'
import Card from './Card';

const TodoList = ({history}) => {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([])
    
    useEffect(() => {
        let arr = localStorage.getItem("taskList")
       
        if(arr){
            let obj = JSON.parse(arr)
            setTaskList(obj)
        }
    }, [])


    const deleteTask = (index) => {
        let tempList = taskList
        tempList.splice(index, 1)
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(tempList)
        window.location.reload()
    }

    const updateListArray = (obj, index) => {
        let tempList = taskList
        tempList[index] = obj
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(tempList)
        window.location.reload()
    }

    const toggle = () => {
        setModal(!modal);
    }

    const saveTask = (taskObj) => {
        let tempList = taskList
        tempList.push(taskObj)
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(taskList)
        setModal(false)
    }

    const logout = () => {
        signOut(auth)
          .then(() => {
            localStorage.removeItem("token");
            history.push("/");
          })
          .catch((e) => alert(e.message));
      };


      useEffect(() => {
        const token = localStorage.getItem("token");
    
        if (!token) {
          history.push("/");
        }
      }, []);

      const auth = getAuth();

    return (
        <>
        <div className="d-flex justify-content-end p-2" style={{"background-color" : "#E9EEF6"}}>
          <button
            onClick={logout}
            className="w-lg text-white px-3 py-2 rounded text-xl font-bold"
            style={{"background-color":  "#821D30"}}
          >
            Logout
          </button>
        </div>
            <div className = "header text-center">
                <h3>Todo List</h3>
                <button className = "btn mt-2" style={{"background-color":  "#821D30","color":"white"}} onClick = {() => setModal(true)} >Create Task</button>
            </div>
            <div className = "task-container">
            {taskList && taskList.map((obj , index) => <Card taskObj = {obj} index = {index} deleteTask = {deleteTask} updateListArray = {updateListArray}/> )}
            </div>
  
            <CreateTask toggle = {toggle} modal = {modal} save = {saveTask}/>
        </>
    );
};

export default TodoList;