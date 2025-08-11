import styles from '../App.module.css';

export const SearchBarLayout = ({ search, setSearch, isSorted, setIsSorted }) => {
	return (
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
		</>
	);
};
