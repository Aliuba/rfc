import React, {useEffect, useReducer, useState} from 'react';
import './App.css'

const initialState=null;
const reducer=(state, action)=>{
    switch (action.type){
        case 'SET_TODO_ITEM':{
            return action.payload
        }
        case 'RESET_USER':{
            return action.payload
        }
        case 'CHANGE_NAME':{
            return {
                ...state,
                name:state.name+'_changed'
            }
        }
        case 'CHANGE_NAME_ON_INPUT':{
            return {
                ...state,
                name: action.payload
            }
        }
        default:{
            console.error("not valid action", action.type)
            return state
        }
    }

}


function App() {
    const [data, setData] = useState(1);
    // const [user, setUser]=useState(null)
    const [inputValue, inputChange]=useState('')
    const[state, dispatch]=useReducer(reducer, initialState)
    console.log(data)
    const fetchData=async ()=>{
      await  fetch(`https://jsonplaceholder.typicode.com/users/${data}`)
            .then(response => response.json())
            .then(json => dispatch({type:'SET_TODO_ITEM', payload: json}))}

    const Increase = () => {
        setData(() => data + 1)
    }
    const Reset = () => {
        dispatch({type:"RESET_USER", payload: null})
    }
    const ChangeName = () => {
        dispatch({type:"CHANGE_NAME"})
    }
    const ChangeOnInput = () => {
        dispatch({type:"CHANGE_NAME_ON_INPUT", payload:inputValue})
    }

    useEffect(() => {
        console.log("use Effect")
        fetchData();
    }, [data])

    return (
        <div className="spp">
            <h1>click {data}</h1>
            <button onClick={Increase}>increase</button>
            <button onClick={Reset}>res</button>
            <button onClick={ChangeName}> change name </button>
            <input value={inputValue} onChange={(e)=>inputChange(e.target.value)}/>
            <button onClick={ChangeOnInput}> change on input</button>
            {!!state&&(<div>{state.name}--{state.id}</div>)}
        </div>
    );
}


export default App;
