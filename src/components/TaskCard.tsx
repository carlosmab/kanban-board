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
        items-center
        text-left
        rounded-xl
        hover:ring-2
        hover:ring-rose-500
        cursor-grabs
      "
    >
      {task.content}
    </div>
  )
}

export default TaskCard