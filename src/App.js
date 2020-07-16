import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
	const [repositories, setRepositories] = useState([]);

	useEffect(() => {
		api.get('/repositories')
			.then(res => setRepositories(res.data))
	}, [])

  async function handleAddRepository() {
		const res = await api.post('/repositories', {
			title: 'Testando',
			url: 'http://localhost:3333/testando',
			techs: ['Node.js', 'React.js']
		})

		setRepositories([...repositories, res.data])
	}

  async function handleRemoveRepository(id) {
		await api.delete(`/repositories/${id}`)

		const updatedRepositories = repositories.filter(repository => repository.id !== id)
		setRepositories(updatedRepositories)
  }

  return (
    <div>
      <ul data-testid="repository-list">
				{repositories.map(repository => (
					<li key={repository.id}>
						{repository.title } 
						<button onClick={() => handleRemoveRepository(repository.id)}>
							Remover
						</button>
					</li>
				))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
