import { useContext } from 'react';
import MyContext from '../../context/context';


function CompleteTasks () {
    const ctx = useContext( MyContext );

    const dragStart = e => {
        const target = e.target;
        e.dataTransfer.setData( 'taskId', target.id );
        e.dataTransfer.setData( 'taskTitle', target.title );
        e.dataTransfer.setData( 'taskContent', target.attributes.content.value );

    }

    const dragOver = e => {
        e.stopPropagation();

    }
    const dragEnd = e => {
        ctx.removeComplete( e.target.id )
    }

    return (
        <>
            {ctx.complete.map( task => (
                <li
                    title={task.title}
                    content={task.content}
                    id={task.id}
                    draggable
                    key={task.id}
                    className='task'
                    onDragStart={dragStart}
                    onDragOver={dragOver}
                    onDragEnd={dragEnd}
                >
                    <span>{task.title}<button onClick={() => ctx.removeComplete( task.id )} className="deleteButton">x</button></span>
                    <p>{task.content}</p>
                    <button className="proceedButton" onClick={() => {
                        ctx.removeComplete( task.id )
                    }}>&rarr;</button>
                </li>
            ) )}
        </>
    );
};
export default CompleteTasks;
