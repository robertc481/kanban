import React, { createContext, useState } from 'react';

const MyContext = createContext( {
	todo: [],
	addTodo: ( todoTask ) => { },
	removeTodo: ( todoId ) => { },
	inprogress: [],
	addInProgress: ( inprogressTask ) => { },
	removeInProgress: ( inprogressId ) => { },
	complete: [],
	addComplete: ( completeTask ) => { },
	removeComplete: ( completeId ) => { }
} );
export function MyContextProvider ( { children } ) {
	const [todoTasks, setTodoTasks] = useState( [{
		id: "localstorage",
		title: 'Local Storage',
		content: 'Save data in localStorage'
	}] );
	const [inprogressTasks, setInprogressTasks] = useState( [{
		id: 'gethired',
		title: "Get hired",
		content: 'Get a front-end developer position job'
	}] );
	const [completeTasks, setCompleteTasks] = useState( [{
		id: 'thecontext',
		title: 'Context',
		content: 'Provide app-wide context'
	}] );

	function addTodoTask ( todoTask ) {
		return setTodoTasks( [...todoTasks, todoTask] );
	}
	function removeTodo ( todoId ) {
		return setTodoTasks( todoTasks.filter( task => task.id !== todoId ) )
	}
	function addInprogressTask ( inprogressTask ) {
		return setInprogressTasks( [...inprogressTasks, inprogressTask] );
	}
	function removeInprogress ( inprogressId ) {
		return setInprogressTasks( inprogressTasks.filter( task => task.id !== inprogressId ) )
	}
	function addCompleteTask ( completeTask ) {
		return setCompleteTasks( [...completeTasks, completeTask] );
	}
	function removeComplete ( completeId ) {
		return setCompleteTasks( completeTasks.filter( task => task.id !== completeId ) );
	}
	const context = {
		todo: todoTasks,
		addTodo: addTodoTask,
		removeTodo: removeTodo,
		inprogress: inprogressTasks,
		addInProgress: addInprogressTask,
		removeInProgress: removeInprogress,
		complete: completeTasks,
		addComplete: addCompleteTask,
		removeComplete: removeComplete
	};
	return <MyContext.Provider value={context}>{children}</MyContext.Provider>;
}
export default MyContext;