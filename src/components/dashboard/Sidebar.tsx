"use client";

import Link from "next/link";
import { Settings, LayoutGrid, Database, Monitor, CheckCircle, FileText, Activity, HelpCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
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
      "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
      // Inactive Styles
      "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100",
      "hover:bg-slate-100/50 dark:hover:bg-white/5",
      // Active Styles
      isActive && "bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white shadow-sm"
    );
  };

  return (
    <aside className={cn(
      "fixed inset-y-0 left-0 z-20 hidden w-72 flex-col border-r bg-white/70 dark:bg-black/70 backdrop-blur-xl border-slate-200/50 dark:border-white/10 sm:flex"
    )}>
      {/* Header Section */}
      <div className="flex h-20 items-center px-6">
        <Link href="/dashboard" className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
          <div className="w-8 h-8 bg-slate-900 dark:bg-white rounded-lg flex items-center justify-center">
            <span className="text-white dark:text-black font-bold text-sm">C</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">
              Control <span className="text-slate-500 font-medium">Pages</span>
            </span>
            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-tight">Enterprise v2.0</span>
          </div>
        </Link>
      </div>

      {/* Navigation Section */}
      <div className="flex flex-1 flex-col overflow-y-auto px-4 py-4 scrollbar-hide">
        <div className="space-y-8">

          {/* Menu Principal */}
          <div className="space-y-2">
            <h3 className="px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Conteúdo
            </h3>
            <nav className="space-y-1">
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={getLinkClasses(item.href)}
                >
                  <item.icon className={cn(
                    "h-4 w-4 shrink-0 transition-colors",
                    pathname === item.href ? "text-slate-900 dark:text-white" : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300"
                  )} />
                  <span className="truncate">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Menu Sistema */}
          <div className="space-y-2">
            <h3 className="px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Sistema
            </h3>
            <nav className="space-y-1">
              {systemNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={getLinkClasses(item.href)}
                >
                  <item.icon className={cn(
                    "h-4 w-4 shrink-0 transition-colors",
                    pathname === item.href ? "text-slate-900 dark:text-white" : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300"
                  )} />
                  <span className="truncate">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>

        </div>

        {/* Upgrade/Support Mini Widget */}
        <div className="mt-auto pt-6">
          <Link
            href="/dashboard/support"
            className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5 hover:border-slate-200 dark:hover:border-white/10 transition-colors group"
          >
            <div className="w-8 h-8 rounded-lg bg-white dark:bg-white/10 flex items-center justify-center shadow-sm">
              <HelpCircle className="h-4 w-4 text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-slate-900 dark:text-white truncate">Suporte VIP</span>
              <span className="text-[10px] text-slate-500 truncate">Sua central de ajuda</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Footer Section */}
      <div className="px-4 py-4 border-t border-slate-100 dark:border-white/5">
        <LogoutButton />
      </div>
    </aside>
  );
};