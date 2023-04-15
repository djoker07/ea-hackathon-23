import React, { useState, createContext } from "react";

// inicializar el context
const Context = createContext(null);

const MyContext = PassedComponent => {
	const [results, setResults] = useState({
		store: {
			results: []
		},
		actions: {
      setSyllabusResults: res => {
        results.store.results = res ? res : []
        setResults({
          store: {results: [...results.store.results]},
          actions: { ...results.actions }
        })
      },

		}
	});

	return (
		<Context.Provider value={{ results, setResults }}>
			{PassedComponent.children}
		</Context.Provider>
	);
};

export { Context, MyContext };