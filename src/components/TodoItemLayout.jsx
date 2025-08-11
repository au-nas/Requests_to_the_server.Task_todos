import styles from '../App.module.css';

export const TodoItemLayout = ({
	todo,
	editingIdTodo,
	editingTextTodo,
	setEditingTextTodo,
	startEdit,
	saveEdit,
	cancelEdit,
	deleteTodo,
}) => {
	return (
		<li key={todo.id} className={styles.item}>
			
			{editingIdTodo === todo.id ? (
				<>
					<input
						type="text"
						value={editingTextTodo}
						onChange={(e) => setEditingTextTodo(e.target.value)}
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
	);
};
