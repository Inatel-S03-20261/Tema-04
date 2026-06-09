import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Eye, EyeOff, UserPlus, Loader2, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface RegisterPageProps {
  onGoToLogin: () => void;
}

export default function Register({ onGoToLogin }: RegisterPageProps) {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Preencha todos os campos.");
      return;
    }
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }
    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      await register(name, email, password);
    } catch (err: any) {
      setError(err?.message ?? "Erro ao criar conta. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSubmit();
  }

  const fields = [
    {
      label: "Nome completo",
      type: "text",
      value: name,
      onChange: (v: string) => setName(v),
      placeholder: "Ash Ketchum",
    },
    {
      label: "E-mail",
      type: "email",
      value: email,
      onChange: (v: string) => setEmail(v),
      placeholder: "ash@inatel.br",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-purple-500/20 blur-3xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-indigo-500/20 blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], rotate: [-90, 0, -90] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-md px-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 18 }}
      >
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
          <motion.button
            onClick={onGoToLogin}
            className="flex items-center gap-1.5 text-white/50 hover:text-white/80 text-sm mb-6 transition-colors group"
            whileHover={{ x: -2 }}
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Voltar para login
          </motion.button>

          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 border border-white/20 mb-4 shadow-xl"
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <UserPlus className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white">Criar conta</h1>
            <p className="text-white/60 mt-1 text-sm">Monte sua coleção de cartas Pokémon</p>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {fields.map(({ label, type, value, onChange, placeholder }) => (
              <div key={label}>
                <label className="block text-white/80 text-sm font-medium mb-1.5">{label}</label>
                <input
                  type={type}
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={placeholder}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 transition-all"
                />
              </div>
            ))}

            <div>
              <label className="block text-white/80 text-sm font-medium mb-1.5">Senha</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-1.5">
                Confirmar senha
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Repita a senha"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 transition-all"
              />
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  className="bg-red-500/20 border border-red-400/40 rounded-xl px-4 py-3 text-red-200 text-sm"
                  initial={{ opacity: 0, y: -8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -8, height: 0 }}
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-pink-500 hover:bg-pink-400 disabled:bg-pink-500/50 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-pink-500/30 mt-2"
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.97 }}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Criar conta
                </>
              )}
            </motion.button>
          </motion.div>

          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            <p className="text-white/50 text-sm">
              Já tem conta?{" "}
              <button
                onClick={onGoToLogin}
                className="text-indigo-300 hover:text-white font-medium transition-colors underline-offset-2 hover:underline"
              >
                Fazer login
              </button>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
