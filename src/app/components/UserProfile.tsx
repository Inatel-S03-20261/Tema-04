import { motion, AnimatePresence } from "motion/react";
import { Settings, LogOut } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface UserProfileProps {
  user: {
    name: string;
    avatar: string;
    level: number;
  };
}

export function UserProfile({ user }: UserProfileProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        className="flex items-center gap-3 bg-white rounded-full pr-4 pl-1 py-1 shadow-lg hover:shadow-xl transition-shadow"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          src={user.avatar}
          alt={user.name}
          className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500"
        />
        <div className="text-left">
          <div className="text-sm text-gray-900 leading-none mb-1">{user.name}</div>
          <div className="text-xs text-gray-500">Nível {user.level}</div>
        </div>
      </motion.button>

      {/* Dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl overflow-hidden z-50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-gray-700">
              <Settings className="w-4 h-4" />
              <span className="text-sm">Configurações</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-red-600">
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Sair</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
