import { useContext } from 'react';
import MyContext from '../../context/context';
import './Column.css';


export default function Column ( { title, bgcColor, children, modalHandler, category } ) {
    const ctx = useContext( MyContext );

    const dropTask = ( e ) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData( 'taskId' );
        const taskTitle = e.dataTransfer.getData( 'taskTitle' );
        const taskContent = e.dataTransfer.getData( 'taskContent' );
        const task = {
            id: taskId,
            title: taskTitle,
            content: taskContent
        };
        if ( e.target.attributes.category.value === 'todo' ) return ctx.addTodo( task );
        if ( e.target.attributes.category.value === 'inprogress' ) return ctx.addInProgress( task );
        if ( e.target.attributes.category.value === 'complete' ) return ctx.addComplete( task );
    }
    const dragOver = ( e ) => {
        e.preventDefault();
    }
    return (
        <section className="columnSection">
            <header className={`columnHeader ${bgcColor}`}>
                <h3>{title}</h3>
                <button className="headerAddButton" onClick={modalHandler}>+</button>
            </header>
            <ul
                category={category}
                droppable
                className="columnList"
                onDrop={dropTask}
                onDragOver={dragOver}
            >{children}</ul>
        </section >
    );
}
