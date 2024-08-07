import { useEffect, useRef, useState, useContext } from "react";
import { MdDeleteOutline,MdOutlineEdit } from "react-icons/md";
import { BsCheckCircleFill,BsCircle   } from "react-icons/bs";
import context from '../components/Context';

const TodoList = ()=>{
  const {todos,setTodos} = useContext(context);
  return (
    <ol className="todo_list">
      {todos && todos.length > 0 ? (
        todos?.map((item, index) => (
          <Item key={index} item={item} todos={todos} setTodos={setTodos} />
        ))
      ) : (
        <p>Todo List Task</p>
      )}
    </ol>
  );
}

function Item({index,item,todos,setTodos}){
  const [editing,setEditing] = useState(false);
  const inputRef =  useRef(null);

  const handleInpuSubmit =(event)=>{
    event.preventDefault();

    // Update localStorage after editing todo
    const updatedTodos = JSON.stringify(todos);
    localStorage.setItem("todos", updatedTodos);

    setEditing(false);
  }

  
  const completeTodo = () => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === item.id
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo
      )
    );

    // Update localStorage after marking todo as completed
    const updatedTodos = JSON.stringify(todos);
    localStorage.setItem("todos", updatedTodos);
  };

  const handleEdit = ()=>{
      setEditing(true);
  }

  useEffect(()=>{
    if(editing && inputRef.current){
        inputRef.current.focus();

        // position the cursor  at the end of the input text
        inputRef.current.setSelectionRange(
          inputRef.current.value.length,
          inputRef.current.value.length
        );
    }
  },[editing]);

  const handleInputBlur = ()=>{
    //update todo data into local storage
    const todosData =  JSON.stringify(todos);
    localStorage.setItem("todos",todosData);
    setEditing(false);
  }

  const handleInputChange =(e)=>{
    const changedTodo =  e.target.value;
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === item.id
          ? { ...todo, name: changedTodo }
          : todo
      )
    );
  }

  const handleDelete = ()=>{
    const todosData = todos.filter((todo)=>todo.id!=item.id);
    setTodos(todosData);
    //update todos in localstorage
    //stringify update todosData
    const updateTodosData =  JSON.stringify(todosData);
    localStorage.setItem("todos",updateTodosData);
  }

  return (
    <li id={index} className="todo_item">
      {editing ? (
        <form className="edit-form" onSubmit={handleInpuSubmit}>
          <label htmlFor="edit-todo">
            <input
              ref={inputRef}
              type="text"
              name="edit-todo"
              id="edit-todo"
              defaultValue={item?.name}
              onBlur={handleInputBlur}
              onChange={handleInputChange}
            />
          </label>
        </form>
      ) : (
        <>
          <button className="todo_items_left" onClick={completeTodo}>
          {item.isCompleted ? <BsCheckCircleFill  size={26} /> : <BsCircle size={26} />}
            <p
              style={
                item.isCompleted ? { textDecoration: "line-through" } : {}
              }
            >
              {item?.name}
            </p>
          </button>
          <div className="todo_items_right">
            <button onClick={handleEdit}>
              <span className="visually-hidden">Edit</span>
              <MdOutlineEdit size={26}/>
              
            </button>
            <button onClick={handleDelete}>
              <span className="visually-hidden">Delete</span>
              <MdDeleteOutline    size={26}/>
             
            </button>
          </div>
        </>
      )}
    </li>
  );

}

export default TodoList;