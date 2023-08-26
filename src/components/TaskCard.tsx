import { useState } from "react";
import TrashIcon from "../icons/TrashIcon";
import { Id, Task } from "../types";

interface Props {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
}

function TaskCard(props: Props) {
  const { task, deleteTask, updateTask } = props;
  const [ editMode, setEditMode ] = useState(false);
  const [mouseIsOver, setMouseIsOver] = useState(false);

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  }

  if (editMode) {
    return (
      <div
      className="
        bg-mainBackgroundColor
        p-2.5
        h-[100px]
        min-h-[100px]
        flex
        items-center
        text-left
        rounded-xl
        hover:ring-2
        hover:ring-inset
        hover:ring-rose-500
        cursor-grab
        relative
      "
    >
     <textarea 
      value={task.content}
      autoFocus
      placeholder="Add a new task"
      onChange={(e) => {
        updateTask(task.id, e.target.value);
      }}
      onBlur={() => setEditMode(false)}
      onKeyDown={e => {
        if (e.key !== "Enter") { return; }
        setEditMode(false);
      }}
      className="
        h-[90%]
        W-full
        resize-none
        border-none
        rounded
        bg-transparent
        text-white
        focus:outline-none
      "
     >

     </textarea>
    </div>
      
    )
  }

  return (
    <div
      className="
        bg-mainBackgroundColor
        p-2.5
        h-[100px]
        min-h-[100px]
        flex
        items-center
        text-left
        rounded-xl
        hover:ring-2
        hover:ring-inset
        hover:ring-rose-500
        cursor-grab
        relative
      "
      onClick={toggleEditMode}
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
    >
      {task.content}
      {mouseIsOver && (<button
        onClick={() => {
          deleteTask(task.id);
        }}
        className="
          stroke-white
          absolute
          right-4
          top-1/2
          -translate-y-1/2
          bg-columnBackgroundColor
          p-2
          rounded
          opacity-60
          hover:opacity-100
        "
      >
        <TrashIcon />
      </button>)}
    </div>
  );
}

export default TaskCard;
