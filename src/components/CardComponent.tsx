import type { TodoComponentProps } from "../types/types";
import "./CardComponent.css";

const CardComponent = ({ todo, onToggle }: TodoComponentProps) => {
  return (
    <div className="card-container" onClick={onToggle}>
      <input
        type="checkbox"
        checked={todo.isChecked}
        onChange={onToggle}
        onClick={(e) => e.stopPropagation()}
      />
      <p className={todo.isChecked ? "completed" : ""}>
        {todo.todo}
      </p>
    </div>
  );
};

export default CardComponent;