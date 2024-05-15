// eslint-disable-next-line no-unused-vars
import React from 'react';

// eslint-disable-next-line react/prop-types
const Todos = ({ todos, setTodos }) => {
    const updateTodo = (id) => {
        fetch('http://localhost:3000/completed', {
            method: "PUT",
            body: JSON.stringify({
                id: id,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(async (res) => {
            if (res.ok) {
                const json = await res.json();
                alert("Todo Updated");
                // Update todos state if necessary
                const updatedTodos = todos.map(todo => {
                    if (todo.id === id) {
                        return { ...todo, completed: true };
                    }
                    return todo;
                });
                setTodos(updatedTodos);
            } else {
                throw new Error('Failed to update todo');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Failed to update todo");
        });
    };

    return (
        <div>
            {todos.map((todo) => (
                <div key={todo.id}>
                    <h1>{todo.title}</h1>
                    <p>{todo.description}</p>
                    <button onClick={() => updateTodo(todo.id)}>
                        {todo.completed ? "Completed" : "Mark As completed"}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Todos;
