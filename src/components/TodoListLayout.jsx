import styles from '../App.module.css';
import { TodoItemLayout } from './TodoItemLayout';

export const TodoListLayout = ({
	filteredTodos,
	editingIdTodo,
	editingTextTodo,
	setEditingTextTodo,
	startEdit,
	saveEdit,
	cancelEdit,
	deleteTodo,
}) => {
	return (
		<ul className={styles.list}>
			{filteredTodos.map((todo) => (
				<TodoItemLayout key={todo.id} todo={todo} filteredTodos={filteredTodos} editingIdTodo={editingIdTodo} editingTextTodo={editingTextTodo} setEditingTextTodo={setEditingTextTodo} startEdit={startEdit} saveEdit={saveEdit} cancelEdit={cancelEdit} deleteTodo={deleteTodo}/>
			))}
		</ul>
	);
};
