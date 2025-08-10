import { useState, useEffect } from 'react';
import styles from './App.module.css';

export const App = () => {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [newTodo, setNewTodo] = useState('');

	useEffect(() => {
		setIsLoading(true);

		fetch('http://localhost:3003/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedTodos) => {
				setTodos(loadedTodos.slice(0, 15));
			})
			.finally(() => setIsLoading(false));
	}, []);

	const requestAddTodo = () => {
		event.preventDefault();

		const title = newTodo.trim();
		if (!title) return;

		fetch('http://localhost:3003/todos', {
			method: 'POST',
			headers: {'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({ title, completed: false }),
		})
		    .then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Дело добавлено, ответ сервера:', response);
				setTodos((prev) => [...prev, response]);
                setNewTodo('');
			});
	}

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Список дел</h1>
			{isLoading ? (
				<p>Загрузка...</p>
			) : (
				<>
				<ul className={styles.list}>
					{todos.map((todo) => (
						<li key={todo.id} className={styles.item}>
							{todo.title}
						</li>
					))}
				</ul>
				<form onSubmit={requestAddTodo} className={styles.form}>
					<input type="text" value={newTodo} onChange={e => setNewTodo(e.target.value)} placeholder="Новое дело.." className={styles.input}></input>
					<button type="submit" className={styles.button}>Добавить</button>
				</form>
				</>
			)}
		</div>
	);
};
