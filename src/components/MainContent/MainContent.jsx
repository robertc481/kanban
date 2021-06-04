
import './MainContent.css';
import { useContext, useState } from 'react';
import MyContext from '../../context/context';

export default function MainContent ( { children, isModalOff, setIsModalOff } ) {

    const ctx = useContext( MyContext );
    const [titleValue, setTitleValue] = useState( '' );
    const [contentValue, setContentValue] = useState( '' );
    return (
        <main className="mainContent">

            <div className='mainContainer'>
                {children}
                <div className={`modal ${isModalOff ? 'off' : null}`}>
                    <div className="addTask">
                        <h4>Add New Task</h4>
                        <div className="options">
                            <label htmlFor="tasksOptions">Choose type of task:</label>
                            <select name="tasksOptions" id="tasksOptions">
                                <option className="selectOption" value="todo">
                                    To do
							</option>
                                <option className="selectOption" value="inprogress">
                                    In progress
							</option>
                                <option className="selectOption" value="complete">
                                    Complete
							</option>
                            </select>
                            <label htmlFor="taskTitle">
                                Title:
							<input type="text" id="taskTitle" value={titleValue} onChange={( e ) => setTitleValue( e.target.value )} />
                            </label>
                            <label htmlFor="taskContent">
                                Content:
							<textarea name="taskContent" id="taskContent" value={contentValue} onChange={( e ) => setContentValue( e.target.value )} />
                            </label>
                            <button type='reset' onClick={() => {
                                const e = document.getElementById( "tasksOptions" );
                                const value = e.options[e.selectedIndex].value;
                                const task = {
                                    id: `${Math.floor( Math.random() * 100 )}${titleValue}`,
                                    title: titleValue,
                                    content: contentValue
                                }

                                if ( value === 'todo' ) {
                                    ctx.addTodo( task )
                                }
                                if ( value === 'inprogress' ) {
                                    ctx.addInProgress( task )
                                }
                                if ( value === 'complete' ) {
                                    ctx.addComplete( task )
                                }

                                localStorage.setItem( 'userTasks', JSON.stringify( {
                                    todo: ctx.todo,
                                    inprogress: ctx.inprogress,
                                    complete: ctx.complete
                                } ) )
                                setTitleValue( '' );
                                setContentValue( '' );
                                setIsModalOff( true );
                                console.log( JSON.parse( localStorage.getItem( 'userTasks' ) ) );

                            }} >Add!</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}