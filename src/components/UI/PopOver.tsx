import React, { useEffect, useRef } from "react";

type SortOrder = "asc" | "desc";
type Filter = { priority?: string; status?: string };

interface SortPopoverProps {
  open: boolean;
  onClose: () => void;
  sortOrder: SortOrder;
  setSortOrder: (order: SortOrder) => void;
}

export function SortPopover({ open, onClose, sortOrder, setSortOrder }: SortPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div ref={popoverRef} className="absolute right-0 mt-2 w-48 text-sm bg-white border rounded shadow z-50 p-3">
      <div className="mb-2 font-semibold">Sort By Due Date</div>
      <div className="mt-2 flex flex-col gap-2">
        <button
          className={`px-2 py-1 rounded cursor-pointer ${sortOrder === "asc" ? "bg-gray-200" : ""}`}
          onClick={() => setSortOrder("asc")}
        >Oldest First</button>
        <button
          className={`px-2 py-1 rounded cursor-pointer ${sortOrder === "desc" ? "bg-gray-200" : ""}`}
          onClick={() => setSortOrder("desc")}
        >Newest First</button>
      </div>
      <button className="mt-2 text-xs text-[#941B0F] cursor-pointer" onClick={onClose}>Close</button>
    </div>
  );
}

interface FilterPopoverProps {
  open: boolean;
  onClose: () => void;
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>> | ((f: Filter) => void);
}

export function FilterPopover({ open, onClose, filter, setFilter }: FilterPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div ref={popoverRef} className="absolute right-0 mt-2 w-56 text-sm bg-white border rounded shadow z-50 p-3">
      <div className="mb-2 font-semibold">Filter</div>
      <div className="mb-2">
        <label className="block text-sm">Priority</label>
        <select
          className="w-full border rounded px-2 py-1 cursor-pointer"
          value={filter.priority || ""}
          onChange={e =>
            setFilter({
              ...filter,
              priority: e.target.value || undefined,
            })
          }
        >
          <option value="">All</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
      <div>
        <label className="block text-sm">Status</label>
        <select
          className="w-full border rounded px-2 py-1 cursor-pointer"
          value={filter.status || ""}
          onChange={e =>
            setFilter({
              ...filter,
              status: e.target.value || undefined,
            })
          }
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
            <button className="mt-2 text-xs text-[#941B0F] cursor-pointer" onClick={onClose}>Close</button>
    </div>
  );
}