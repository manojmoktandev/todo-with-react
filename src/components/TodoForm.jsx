import { useContext } from "react";
import { RiAddFill } from "react-icons/ri";
import context from '../components/Context';

const TodoForm = ()=>{
  const {todos,setTodos} = useContext(context);
    const handleSubmit=(event)=>{
        event.preventDefault();
        const todosValue = event.target.todo.value;
        if(!todosValue) return;
        const newTodo = {
           id : self.crypto.randomUUID(),
           name : todosValue,
           isCompleted :  false
        }
        setTodos([newTodo,...todos]);

      // Store updated todo list in local storage
      const newTodoList = JSON.stringify([newTodo,...todos ]);
      localStorage.setItem("todos", newTodoList);
      event.target.reset();
    }
       
    return(
        <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="todo">
            <input
            type="text"
            name="todo"
            id="todo"
            placeholder="Write your next task"
            />
        </label>

    <button>
        <span className="visually-hidden">Submit</span>
        <RiAddFill size={26} />
      </button>
    </form>
    );
}

export default TodoForm;