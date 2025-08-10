import { useState, useEffect } from 'react';
import styles from './App.module.css';

export const App = () => {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [newTodo, setNewTodo] = useState('');

	const [editingTextTodo, setEditingTextTodo] = useState('');
	const [editingIdTodo, setEditingIdTodo] = useState(null);

	const [search, setSearch] = useState('');

	const [isSorted, setIsSorted] = useState(false);

	useEffect(() => {
		setIsLoading(true);

		fetch('http://localhost:3003/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedTodos) => {
				setTodos(loadedTodos);
			})
			.finally(() => setIsLoading(false));
	}, []);

	const requestAddTodo = () => {
		event.preventDefault();

		const title = newTodo.trim();
		if (!title) return;

		fetch('http://localhost:3003/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({ title, completed: false }),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Дело добавлено, ответ сервера:', response);
				setTodos((prev) => [...prev, response]);
				setNewTodo('');
			});
	};

	const startEdit = (todo) => {
		setEditingIdTodo(todo.id);
		setEditingTextTodo(todo.title);
	};

	const cancelEdit = () => {
		setEditingIdTodo(null);
		setEditingTextTodo('');
	};

	const saveEdit = (id) => {
		const newTitle = editingTextTodo.trim();

		fetch(`http://localhost:3003/todos/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ title: newTitle }),
		})
			.then((res) => res.json())
			.then((updatedTodo) => {
				setTodos((prev) =>
					prev.map((todo) => (todo.id === id ? updatedTodo : todo)),
				);
				cancelEdit();
			});
	};

	const deleteTodo = (id) => {
		fetch(`http://localhost:3003/todos/${id}`, {
			method: 'DELETE',
		}).then(() => {
			setTodos((prev) => prev.filter((todo) => todo.id !== id));
		});
	};

	let filteredTodos = todos.filter((todo) =>
		todo.title.toLowerCase().includes(search.toLowerCase()),
	);

	if (isSorted) {
		filteredTodos = [...filteredTodos].sort((a, b) => a.title.localeCompare(b.title));
	}

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Список дел</h1>
			{isLoading ? (
				<p>Загрузка...</p>
			) : (
				<>
					<input
						type="text"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Поиск дела.."
						className={styles.input}
					/>
					<button
						onClick={() => setIsSorted(!isSorted)}
						className={`${styles.button} ${styles.cancel}`}
					>
						{isSorted ? 'По порядку' : 'Сортировать по алфавиту'}
					</button>
					<ul className={styles.list}>
						{filteredTodos.map((todo) => (
							<li key={todo.id} className={styles.item}>
								{/* {todo.title} */}
								{editingIdTodo === todo.id ? (
									<>
										<input
											type="text"
											value={editingTextTodo}
											onChange={(e) =>
												setEditingTextTodo(e.target.value)
											}
											className={styles.input}
										/>
										<button
											onClick={() => saveEdit(todo.id)}
											className={`${styles.button} ${styles.save}`}
										>
											Сохранить
										</button>
										<button
											onClick={cancelEdit}
											className={`${styles.button} ${styles.cancel}`}
										>
											Отмена
										</button>
									</>
								) : (
									<>
										<span>{todo.title}</span>
										<button
											onClick={() => startEdit(todo)}
											className={`${styles.button} ${styles.edit}`}
										>
											Редактировать
										</button>
										<button
											onClick={() => deleteTodo(todo.id)}
											className={`${styles.button} ${styles.delete}`}
										>
											Удалить
										</button>
									</>
								)}
							</li>
						))}
					</ul>
					<form onSubmit={requestAddTodo} className={styles.form}>
						<input
							type="text"
							value={newTodo}
							onChange={(e) => setNewTodo(e.target.value)}
							placeholder="Новое дело.."
							className={styles.input}
						></input>
						<button
							type="submit"
							className={`${styles.button} ${styles.add}`}
						>
							Добавить
						</button>
					</form>
				</>
			)}
		</div>
	);
};
