import { useContext } from 'react';
import MyContext from '../../context/context';


function InprogressTasks () {
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
		ctx.removeInProgress( e.target.id )
	}

	return (
		<>
			{ctx.inprogress.map( task => (
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
					<span>
						{task.title}
						<button
							onClick={() => ctx.removeInProgress( task.id )}
							className="deleteButton"
						>x</button>
					</span>
					<p>{task.content}</p>
					<button
						className="proceedButton"
						onClick={() => {
							ctx.addComplete( task )
							ctx.removeInProgress( task.id )
						}}>&rarr;</button>
				</li>
			) )}
		</>
	);
};
export default InprogressTasks;
