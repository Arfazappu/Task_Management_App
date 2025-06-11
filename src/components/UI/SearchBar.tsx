import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { useTask } from "@/context/TaskContext";

const SearchBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { searchQuery, setSearchQuery } = useTask();
  const [localValue, setLocalValue] = useState(searchQuery);

  useEffect(() => {
    setLocalValue(searchQuery);
  }, [searchQuery]);

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(localValue);
    }, 300); // 300ms debounce

    return () => clearTimeout(handler);
  }, [localValue, setSearchQuery]);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  return (
    <div className="relative m-2 md:m-5">
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          aria-label="Open Search"
          className="p-2 md:hidden"
        >
          <Search className="w-10 h-auto p-2 rounded-xs text-white bg-[#941B0F]" />
        </button>
      )}

      <div className={`relative ${!isExpanded ? "hidden" : ""} md:block`}>
        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          placeholder="Search..."
          className="pl-10 pr-4 py-2 border rounded-xs text-sm outline-none w-full md:w-72"
        />
      </div>
    </div>
  );
};

export default SearchBar;