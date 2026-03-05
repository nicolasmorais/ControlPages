import { LoginFormOffline } from '@/components/auth/LoginFormOffline';
import { Metadata } from 'next';
import { cn } from '@/lib/utils';
import { Toaster } from 'sonner';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Login - Control Pages',
  description: 'Acesse o painel de gerenciamento de advertoriais',
};

export default function LoginPage() {

  return (
    <>
      <Toaster richColors position="top-center" />
      <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-slate-50 dark:bg-[#020617]">

        {/* Background Decorative Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#0061FE]/10 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px]" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] dark:opacity-[0.05]" />
        </div>

        <div className="relative z-10 w-full max-w-md px-6">
          <div className="flex flex-col items-center text-center space-y-8">

            {/* Logo Area */}
            <div className="animate-in fade-in slide-in-from-top-4 duration-1000">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#0061FE] to-[#0054DA] rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/30">
                  <span className="text-white font-black text-2xl">C</span>
                </div>
                <div className="flex flex-col items-start translate-y-1">
                  <span className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
                    Control <span className="text-[#0061FE]">Pages</span>
                  </span>
                  <span className="text-[12px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mt-1">Enterprise v2.0</span>
                </div>
              </div>
            </div>

            {/* Form Card */}
            <div className="w-full bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-2xl shadow-slate-200/50 dark:shadow-none animate-in fade-in zoom-in-95 duration-700 delay-200">
              <div className="mb-8 text-center">
                <h1 className="text-slate-900 dark:text-white text-3xl font-bold tracking-tight">
                  Página de Acesso
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 font-medium">
                  Insira sua senha de segurança abaixo
                </p>
              </div>

              <LoginFormOffline />

              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/50 text-center">
                <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">
                  Control Pages • Enterprise v2.0
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}