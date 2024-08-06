import {useContext} from 'react';
import context from '../components/Context';


const TodoHero =()=>{
    const {todosCompleted,totalTodos} = useContext(context);
        return (
            <section className="todohero_section">
                <div>
                <p className="text_large">Task Done</p>
                <p className="text_small">Keep it up</p>
                </div>
                <div>
                        {todosCompleted}/{totalTodos}
                </div>
            </section>
        );
    }
    export default  TodoHero;