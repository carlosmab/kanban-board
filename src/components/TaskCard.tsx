import TrashIcon from '../icons/TrashIcon';
import { Task } from '../types';

interface Props {
  task: Task;
}

function TaskCard(props: Props) {
  
  const {task} = props

  return (
    <div
      className="
        bg-columnBackgroundColor
        p-2.5
        h-[100px]
        min-h-[100px]
        flex
        items-center
        text-left
        rounded-xl
        hover:ring-2
        hover:ring-rose-500
        cursor-grab
        relative
      "
    >
      {task.content}
      <button
        className="
          stroke-white
          absolute
          right-4
          top-1/2
          -translate-y-1/2
          bg-columnBackgroundColor
          p-2
          rounded
        "
      >
        <TrashIcon />
      </button>
    </div>
  )
}

export default TaskCard