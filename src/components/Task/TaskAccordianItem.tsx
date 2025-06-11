import React, { useState } from "react";
import { ChevronDown, ChevronUp, SquarePen, Trash2 } from "lucide-react";
import StatusTag from "../UI/Statustag";
import PriorityTag from "../UI/PriorityTag";
import { Task } from "@/types/task";
import { useTask } from "@/context/TaskContext";

type Props = {
  task: Task;
  index: number;
};

const TaskAccordionItem = ({ task, index }: Props) => {
  const { setShowEditModal, setSelectedTask, setShowDeleteModal } = useTask()
  const [isOpen, setIsOpen] = useState(false);
  const isEven = index % 2 === 0;

  const handleEdit = () => {
    setSelectedTask(task)
    setShowEditModal(true)
  }

  const handleDelete = () => {
    setSelectedTask(task)
    setShowDeleteModal(true)
  }

  return (
    <div
      className={`${isEven ? "bg-white" : "bg-[#fffaf9]"} px-4 py-3 text-sm`}
    >
      <div
        className="relative grid grid-cols-[100px_1fr] gap-x-1 gap-y-2 text-gray-800 space-y-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="text-[#941B0F] font-medium">SL.No</div>
        <div className="font-semibold">{index + 1}</div>

        <div className="text-[#941B0F] font-medium">Title</div>
        <div className="font-semibold">{task.title}</div>
        <div className="absolute top-0 right-0">
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>

      {/* Expanded Content */}
      {isOpen && (
        <div className="relative space-x-2">
          <div className="grid grid-cols-[100px_1fr] gap-x-1 gap-y-2 text-gray-800">
            <div className="text-[#941B0F] font-medium">Description</div>
            <div className="font-semibold">{task.description}</div>

            <div className="text-[#941B0F] font-medium">Due Date</div>
            <div className="font-semibold">{task.dueDate}</div>

            <div className="text-[#941B0F] font-medium">Status</div>
            <div className="font-semibold">
              <StatusTag status={task.status} />
            </div>

            <div className="text-[#941B0F] font-medium">Priority</div>
            <div className="font-semibold">
              <PriorityTag priority={task.priority} />
            </div>
          </div>

          <div className="flex gap-3 absolute bottom-0 right-0">
            <button onClick={handleEdit} className='cursor-pointer'><SquarePen size={16}/></button>
            <button onClick={handleDelete} className='cursor-pointer'><Trash2 size={16} /></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskAccordionItem;
