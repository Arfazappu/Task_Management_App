"use client";

import React, { useState } from "react";
import SearchBar from "../UI/SearchBar";
import Button from "../UI/Button";
import { ArrowDownUp, FunnelX, ListFilter, Plus } from "lucide-react";
import TaskTable from "./TaskTable";
import TaskAccordian from "./TaskAccordian";
import { useTask } from "@/context/TaskContext";
import { TaskFormData } from "@/types/task";
import { Modal } from "../UI/Modal";
import { TaskForm } from "./TaskForm";
import { FilterPopover, SortPopover } from "../UI/PopOver";

function TaskManager() {
  const { showAddModal, setShowAddModal, showEditModal, setShowEditModal, showDeleteModal, setShowDeleteModal, selectedTask, setSelectedTask, dispatch, sortField, setSortField, sortOrder, setSortOrder, filter, setFilter } = useTask();
  const [showSortPopover, setShowSortPopover] = useState(false);
  const [showFilterPopover, setShowFilterPopover] = useState(false);

  const handleAddTask = (taskData: TaskFormData): void => {
    dispatch({ type: 'ADD_TASK', payload: taskData });
    setShowAddModal(false);
  };

  const handleEditTask = (taskData: TaskFormData): void => {
    if (!selectedTask) return;
    dispatch({ type: 'EDIT_TASK', payload: { ...selectedTask, ...taskData } });
    setShowEditModal(false);
    setSelectedTask(null);
  };

  const handleDeleteTask = (taskId: number): void => {
    dispatch({ type: 'DELETE_TASK', payload: taskId });
    setShowDeleteModal(false);
  }

  return (
    <div>
      <div className="flex items-start justify-between">
        <img src="/logo.png" alt="Logo" className="w-32 md:w-48 object-cover" />
        <SearchBar />
      </div>
      <div className="flex m-5 flex-row items-center justify-between gap-4">
        <h3 className="text-xl font-semibold text-gray-800">Tasks</h3>
        <div className="flex gap-2 flex-wrap">
          <Button text="Add Task" icon={<Plus size={18} />} onClick={() => setShowAddModal(true)} />
          <div className="relative">
            <Button
              text="Sort"
              icon={<ArrowDownUp size={18} />}
              variant="outline"
              showTextOn="md"
              onClick={() => setShowSortPopover(v => !v)}
            />
            <SortPopover
              open={showSortPopover}
              onClose={() => setShowSortPopover(false)}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />
          </div>
          <div className="relative">
            <Button
              text="Filter"
              icon={<ListFilter size={18} />}
              variant="outline"
              showTextOn="md"
              onClick={() => setShowFilterPopover(v => !v)}
            />
            <FilterPopover
              open={showFilterPopover}
              onClose={() => setShowFilterPopover(false)}
              filter={filter}
              setFilter={setFilter}
            />
            {(filter.priority || filter.status) && (
              <button
                onClick={() => setFilter({})}
                className="absolute right-0 flex  text-xs text-red-600 mt-1 underline hover:text-red-800 transition"
                type="button"
              >
                <FunnelX size={16}/>
                Clear
              </button>
            )}
            
          </div>
        </div>
      </div>
      <div className="px-5">
        {/* Shows on other than mobile view */}
        <div className="hidden md:block">
          <TaskTable />
        </div>

        {/* Shows on Mobile view */}
        <div className="block md:hidden">
          <TaskAccordian />
        </div>
      </div>

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Task"
      >
        <TaskForm
          onSubmit={handleAddTask}
          onCancel={() => setShowAddModal(false)}
        />
      </Modal>

      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedTask(null);
        }}
        title="Edit Task"
      >
        {selectedTask && (
          <TaskForm
            initialData={selectedTask}
            onSubmit={handleEditTask}
            onCancel={() => {
              setShowEditModal(false);
              setSelectedTask(null);
            }}
            isEdit
          />
        )}
      </Modal>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => {setShowDeleteModal(false); setSelectedTask(null);}}
        title="Are you sure you wish to delete this task"
      >
        <div className="flex items-center gap-3">
          <Button text="Cancel" variant="outline" onClick={() => {setShowDeleteModal(false); setSelectedTask(null);}} extraStyles="w-full"/>
          <Button 
            text="Delete" 
            onClick={() => {
              if (selectedTask) handleDeleteTask(selectedTask.id);
            }} 
            extraStyles="w-full"
          />
        </div>
      </Modal>
    </div>
  );
}

export default TaskManager;
