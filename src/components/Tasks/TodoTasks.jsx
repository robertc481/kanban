import { useContext } from 'react';
import MyContext from '../../context/context';


function TodoTasks () {
	const ctx = useContext( MyContext );

	localStorage.setItem( 'todoTasks', JSON.stringify( ctx.todo ) );
	const todo = JSON.parse( localStorage.getItem( 'todoTasks' ) );


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
		ctx.removeTodo( e.target.id )
		localStorage.setItem( 'todoTasks', JSON.stringify( ctx.todo ) );
	}


	return (
		<>
			{ !todo ?
				ctx.todo.map( task => (
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
						<span>{task.title}<button onClick={() => ctx.removeTodo( task.id )} className="deleteButton">x</button></span>
						<p>{task.content}</p>
						<button className="proceedButton" onClick={() => {
							ctx.addInProgress( task )
							ctx.removeTodo( task.id )
						}}>&rarr;</button>
					</li>
				) )
				:
				todo.map( task => (
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
						<span>{task.title}<button onClick={() => ctx.removeTodo( task.id )} className="deleteButton">x</button></span>
						<p>{task.content}</p>
						<button className="proceedButton" onClick={() => {
							ctx.addInProgress( task )
							ctx.removeTodo( task.id )
						}}>&rarr;</button>
					</li>
				) )}
		</>
	);
};
export default TodoTasks;
