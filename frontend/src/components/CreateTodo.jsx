// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

const CreateTodo = () => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	const handleAddTodo = () => {
		fetch('http://localhost:3000/todo', {
			method: "POST",
			body: JSON.stringify({
				title: title,
				description: description
			}),
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(async (res) => {
			const json = await res.json();
			alert("Todo Added")
		})
	};
	

	return (
		<div>
			<input
				style={{ margin: 10, padding: 10 }}
				type="text"
				onChange={(e) => setTitle(e.target.value)}
				value={title}
				placeholder='Title'
			/><br />
			<input
				style={{ margin: 10, padding: 10 }}
				type="text"
				onChange={(e) => setDescription(e.target.value)}
				value={description}
				placeholder='description'
			/><br />
			<button
				style={{ margin: 10, padding: 10 }}
				onClick={handleAddTodo}
			>
				Add Todo
			</button>
		</div>
	);
};

export default CreateTodo;
