import './App.css';
import { MyContextProvider } from './context/context.js';
import Column from './components/Column/Column';
import { useState } from 'react';
import TodoTasks from './components/Tasks/TodoTasks';
import InprogressTasks from './components/Tasks/InprogressTasks';
import CompleteTasks from './components/Tasks/CompleteTasks';
import MainContent from './components/MainContent/MainContent';

function App () {
	const [isModalOff, setIsModalOff] = useState( true );
	return (
		<MyContextProvider>

			<MainContent isModalOff={isModalOff} setIsModalOff={() => setIsModalOff( true )} >

				<Column category="todo" title="To do" modalHandler={() => setIsModalOff( false )} bgcColor="red">
					<TodoTasks />
				</Column>
				<Column category="inprogress" title="In Progress" modalHandler={() => setIsModalOff( false )} bgcColor="yellow">
					<InprogressTasks />
				</Column>
				<Column category="complete" title="Completed" modalHandler={() => setIsModalOff( false )} bgcColor="green">
					<CompleteTasks />
				</Column>
			</MainContent>



		</MyContextProvider>
	);
}

export default App;
