import styles from '../App.module.css';

export const AddTodoFormLayout = ({ newTodo, setNewTodo, requestAddTodo }) => {
	return (
		<form onSubmit={requestAddTodo} className={styles.form}>
			<input
				type="text"
				value={newTodo}
				onChange={(e) => setNewTodo(e.target.value)}
				placeholder="Новое дело.."
				className={styles.input}
			></input>
			<button type="submit" className={`${styles.button} ${styles.add}`}>
				Добавить
			</button>
		</form>
	);
};
