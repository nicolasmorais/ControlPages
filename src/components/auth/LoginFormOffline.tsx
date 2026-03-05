"use client";

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, ArrowRight, Lock, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const LoginFormOffline = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        router.push('/dashboard');
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Acesso negado.");
        setPassword('');
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Erro ao conectar com o servidor.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">
          Senha mestra
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-[#0061FE] transition-colors">
            <Lock size={18} />
          </div>
          <Input
            className={cn(
              "h-14 pl-11 pr-12 text-lg rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 transition-all",
              "focus:ring-4 focus:ring-[#0061FE]/10 focus:border-[#0061FE] placeholder:text-slate-400"
            )}
            placeholder="••••••••"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoFocus
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <Button
        type="submit"
        className={cn(
          "h-14 text-lg font-bold rounded-2xl transition-all shadow-xl shadow-[#0061FE]/20 hover:shadow-[#0061FE]/30",
          "bg-[#0061FE] hover:bg-[#0054DA] text-white",
          isSubmitting && "opacity-80 scale-[0.98]"
        )}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Validando...</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span>Entrar no Painel</span>
            <ArrowRight size={20} />
          </div>
        )}
      </Button>
    </form>
  );
};