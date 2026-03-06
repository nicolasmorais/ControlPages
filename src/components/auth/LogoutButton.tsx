"use client";

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', { method: 'POST' });
      if (response.ok) {
        toast.info("Sessão encerrada.");
        router.push('/login');
      } else {
        throw new Error('Falha no logout');
      }
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      toast.error('Não foi possível sair.');
    }
  };

  return (
    <Button
      onClick={handleLogout}
      variant="ghost"
      className={cn(
        "w-full h-10 flex items-center justify-start gap-3 px-3 rounded-xl font-medium transition-all duration-200",
        "text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 dark:text-slate-400 dark:hover:text-red-400"
      )}
    >
      <LogOut className="h-4 w-4 shrink-0 transition-colors" />
      <span className="truncate">Sair do Sistema</span>
    </Button>
  );
}