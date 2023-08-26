import { useState } from "react";
import TrashIcon from "../icons/TrashIcon";
import { Id, Task } from "../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
interface Props {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
}

function TaskCard(props: Props) {
  const { task, deleteTask, updateTask } = props;
  const [ editMode, setEditMode ] = useState(false);
  const [mouseIsOver, setMouseIsOver] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
          opacity-30
        bg-mainBackgroundColor
          p-2.5
          h-[100px]
          min-h-[100px]
          flex
          items-center
          text-left
          rounded-xl
          border-2
          border-rose-500
      "
      ></div>
    );
  }

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  }

  if (editMode) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="
          task
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
        className="
          h-[90%]
          w-full
          resize-none
          border-none
          rounded
          bg-transparent
          text-white
          focus:outline-none
        "
        value={task.content}
        autoFocus
        placeholder="Add a new task"
        onChange={(e) => {
          updateTask(task.id, e.target.value);
        }}
        onBlur={() => setEditMode(false)}
        onKeyDown={e => {
          if (e.key === "Enter" && e.shiftKey) { 
            toggleEditMode();
          }
        }}
      >
      </textarea>
    </div>
      
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
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
      <p 
        className="
          my-auto
          h-[90%]
          w-full
          overflow-y-auto
          overflow-x-hidden
          whitespace-pre-wrap
        "
      >
        {task.content}
      </p>
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
