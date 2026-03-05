"use client";

import Link from "next/link";
import { Settings, Wand2, LayoutGrid, Database, Monitor, CheckCircle, FileText, Activity } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/auth/LogoutButton";

const mainNavItems = [
  {
    href: "/dashboard/static-pages",
    icon: FileText,
    label: "Minhas Páginas",
  },
  {
    href: "/dashboard/pixels",
    icon: Activity,
    label: "Pixels e Tracking",
  },
  {
    href: "/dashboard",
    icon: Settings,
    label: "Route Control",
  },
  {
    href: "/dashboard/custom-advertorials",
    icon: LayoutGrid,
    label: "Meus Advertoriais",
  },
];

const systemNavItems = [
  {
    href: "/dashboard/status",
    icon: CheckCircle,
    label: "Status de Sistema",
  },
  {
    href: "/dashboard/settings",
    icon: Monitor,
    label: "Configurações",
  },
  {
    href: "/dashboard/db-test",
    icon: Database,
    label: "Status Banco",
  },
];

export const Sidebar = () => {
  const pathname = usePathname();

  const getLinkClasses = (href: string) => {
    const isActive = pathname === href;

    return cn(
      "group relative flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-bold transition-all duration-300",
      "hover:translate-x-1 duration-200",
      // Inactive Styles
      "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-900/50",
      // Active Styles
      isActive && [
        "bg-blue-50/80 text-[#0061FE] dark:bg-[#0061FE]/10 dark:text-[#0061FE] shadow-sm shadow-blue-500/5",
        "before:absolute before:left-0 before:h-6 before:w-1.5 before:rounded-r-full before:bg-[#0061FE] before:shadow-[2px_0_10px_rgba(0,97,254,0.4)]"
      ]
    );
  };

  return (
    <aside className={cn(
      "fixed inset-y-0 left-0 z-10 hidden w-72 flex-col border-r bg-white dark:bg-[#020617] border-slate-200/60 dark:border-slate-800/60 sm:flex shadow-[4px_0_24px_rgba(0,0,0,0.02)]"
    )}>
      {/* Header Section */}
      <div className="flex h-28 items-center px-8">
        <Link href="/dashboard" className="transition-all hover:scale-[1.02] active:scale-95">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#0061FE] to-[#0054DA] rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <span className="text-white font-black text-xl">C</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white leading-tight">
                Control <span className="text-[#0061FE]">Pages</span>
              </span>
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">Enterprise v2.0</span>
            </div>
          </div>
        </Link>
      </div>

      {/* Navigation Section */}
      <div className="flex flex-1 flex-col overflow-y-auto px-5 py-4 scrollbar-hide">
        <div className="space-y-10">

          {/* Menu Principal */}
          <div className="space-y-3">
            <h3 className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400/80 dark:text-slate-500/80">
              Gestão de Conteúdo
            </h3>
            <nav className="space-y-1.5">
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={getLinkClasses(item.href)}
                >
                  <div className={cn(
                    "flex items-center justify-center h-8 w-8 rounded-lg transition-all duration-300",
                    pathname === item.href
                      ? "bg-white dark:bg-slate-900 shadow-sm text-[#0061FE]"
                      : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300"
                  )}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className="flex-1">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Menu Sistema */}
          <div className="space-y-3">
            <h3 className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400/80 dark:text-slate-500/80">
              Monitoramento
            </h3>
            <nav className="space-y-1.5">
              {systemNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={getLinkClasses(item.href)}
                >
                  <div className={cn(
                    "flex items-center justify-center h-8 w-8 rounded-lg transition-all duration-300",
                    pathname === item.href
                      ? "bg-white dark:bg-slate-900 shadow-sm text-[#0061FE]"
                      : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300"
                  )}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className="flex-1">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>

        </div>

        {/* Upgrade/Support Widget (Visual Filler) */}
        <div className="mt-auto pt-10">
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-6 border border-slate-100 dark:border-slate-800/50">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-[#0061FE] mb-4">
              <Activity className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Central de Ajuda</h4>
            <p className="text-xs text-slate-500 mt-1 mb-4 leading-relaxed">Precisa de ajuda com suas rotas ou pixels?</p>
            <Button size="sm" className="w-full bg-[#0061FE] hover:bg-[#0054DA] text-white rounded-xl font-bold py-5">
              Suporte VIP
            </Button>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="p-5 border-t border-slate-100 dark:border-slate-800/50 bg-white dark:bg-[#020617]">
        <LogoutButton />
      </div>
    </aside>
  );
};