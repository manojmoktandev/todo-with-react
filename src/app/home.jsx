import React from 'react';
import './styles.css';
import  TodoHeader  from '../components/TodoHeader';
import TodoHero from '../components/TodoHero';
import  TodoForm  from '../components/TodoForm';
import TodoList from '../components/TodoList';
import Context from '../components/Context';

const home=()=>{
    const [todos,setTodos] =  React.useState([]);
    React.useEffect(()=>{
        const todosData =  localStorage.getItem("todos");
        if(todosData){
            setTodos(JSON.parse(todosData));
        }
    },[]);
    const todosCompleted = todos.filter((todo)=>todo.isCompleted==true).length;
    const totalTodos =  todos.length;
    return(<>
     <Context.Provider value={{todosCompleted,totalTodos,todos,setTodos}}>
            <TodoHeader/>
            <TodoHero />
            <TodoForm  />
            <TodoList />
     </Context.Provider>
          
    </>
    );

}

export default home