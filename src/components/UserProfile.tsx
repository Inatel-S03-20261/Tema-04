import { motion, AnimatePresence } from "motion/react";
import { LogOut, User } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface UserProfileProps {
  user: {
    name: string;
    avatar: string;
  };
}

export function UserProfile({ user }: UserProfileProps) {
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
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

  async function handleLogout() {
    setIsLoggingOut(true);
    try {
      await logout();
    } finally {
      setIsLoggingOut(false);
      setIsOpen(false);
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        className="flex items-center gap-3 bg-white border border-gray-200 rounded-full pr-4 pl-1 py-1 shadow-md hover:shadow-xl transition-shadow cursor-pointer"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          src={user.avatar}
          alt={user.name}
          className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500"
        />
        <p className="text-sm text-gray-900 leading-none font-medium">{user.name}</p>
      </motion.button>

      {/* Dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full right-0 mt-2 w-52 bg-white rounded-2xl shadow-2xl overflow-hidden z-50 border border-gray-100"
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="px-4 py-3 bg-gradient-to-br from-indigo-50 to-purple-50 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-indigo-500" />
                <div>
                  <p className="text-xs font-semibold text-gray-900 leading-none">{user.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Jogador</p>
                </div>
              </div>
            </div>

            <motion.button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors text-red-600 disabled:opacity-50"
              whileHover={{ x: 2 }}
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">
                {isLoggingOut ? "Saindo..." : "Sair"}
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
