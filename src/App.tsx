import { useEffect, useState } from "react";
import "./App.css";
import type { TODO } from "./types/types";
import { initialTodo } from "./data/data";
import CardComponent from "./components/CardComponent";


function App() {
  const [todos, setTodos] = useState<TODO[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [showAddTodo, setShowAddTodo] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTodos(initialTodo);
    setError('');
    setLoading(false);
  }, []);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.isChecked;
    if (filter === "completed") return todo.isChecked;
    return true;
  });

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { isChecked: false, todo: newTodo }]);
      setNewTodo("");
      setShowAddTodo(false);
    }
  };

  const toggleTodo = (index: number) => {
    const originalIndex = todos.findIndex((todo, i) => {
      const filteredIndex = filteredTodos.findIndex(ft => ft === todo);
      return filteredIndex === index;
    });
    
    if (originalIndex !== -1) {
      const updatedTodos = [...todos];
      updatedTodos[originalIndex].isChecked = !updatedTodos[originalIndex].isChecked;
      setTodos(updatedTodos);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      <div className="main-container">
        <h1 className="main-title">TODO</h1>
        
        <div className="create-todo-checkbox">
          <input
            type="checkbox"
            checked={showAddTodo}
            onChange={() => setShowAddTodo(!showAddTodo)}
            id="showAddTodoCheckbox"
          />
          <label htmlFor="showAddTodoCheckbox">Create a new todo</label>
        </div>

        {showAddTodo && (
          <div className="add-todo-container">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="What needs to be done?"
              onKeyPress={(e) => e.key === "Enter" && addTodo()}
            />
            <button onClick={addTodo}>Add</button>
          </div>
        )}

        <div className="todo-list">
          {filteredTodos.length === 0 ? (
            <div className="empty-state">
              {filter === "all" && "No todos yet. Create one above!"}
              {filter === "active" && "No active todos"}
              {filter === "completed" && "No completed todos"}
            </div>
          ) : (
            filteredTodos.map((todo, index) => (
              <CardComponent
                key={`${todo.todo}-${index}`}
                todo={todo}
                onToggle={() => toggleTodo(index)}
              />
            ))
          )}

          <div className="footer">
            <div className="footer-left">
              <span>{todos.filter((t) => !t.isChecked).length} items left</span>
            </div>
            <div className="footer-center">
              <button 
                className={filter === "all" ? "active" : ""}
                onClick={() => setFilter("all")}
              >
                All
              </button>
              <button 
                className={filter === "active" ? "active" : ""}
                onClick={() => setFilter("active")}
              >
                Active
              </button>
              <button 
                className={filter === "completed" ? "active" : ""}
                onClick={() => setFilter("completed")}
              >
                Completed
              </button>
            </div>
            <div className="footer-right">
              <button onClick={() => setTodos(todos.filter((t) => !t.isChecked))}>
                Clear Completed
              </button>
            </div>
          </div>
        </div>

        <div className="todo-hint">
          Drag and drop to reorder list
        </div>
      </div>
    </div>
  );
}

export default App;