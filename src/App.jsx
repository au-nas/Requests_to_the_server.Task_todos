import { useState, useEffect } from 'react';
import styles from './App.module.css';

export const App = () => {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);

		fetch('https://jsonplaceholder.typicode.com/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedTodos) => {
				setTodos(loadedTodos.slice(0, 15));
			})
			.finally(() => setIsLoading(false));
	}, []);

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Список дел</h1>
			{isLoading ? (
				<p>Загрузка...</p>
			) : (
				<ul className={styles.list}>
					{todos.map((todo) => (
						<li key={todo.id} className={styles.item}>
							{todo.title}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};
