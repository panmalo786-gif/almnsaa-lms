"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Building2,
  BarChart3,
  Network,
  BookOpen,
  FileQuestion,
  Video,
  MonitorPlay,
  Users,
  ShieldCheck,
  CreditCard,
  Banknote,
  Ticket,
  LayoutTemplate,
  Bot,
  Activity,
  Settings,
} from "lucide-react";

interface MenuItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface MenuGroup {
  label: string;
  items: MenuItem[];
}

const menuGroups: MenuGroup[] = [
  {
    label: "الإدارة والتحليل",
    items: [
      {
        title: "لوحة القيادة",
        href: "/",
        icon: LayoutDashboard,
      },
      {
        title: "المدارس والمجموعات",
        href: "/schools",
        icon: Building2,
      },
      {
        title: "التقارير الذكية",
        href: "/analytics",
        icon: BarChart3,
      },
    ],
  },
  {
    label: "الأكاديمية والمحتوى",
    items: [
      {
        title: "شجرة المهارات",
        href: "/taxonomy",
        icon: Network,
      },
      {
        title: "الكورسات والمناهج",
        href: "/courses",
        icon: BookOpen,
      },
      {
        title: "بنك الأسئلة",
        href: "/questions",
        icon: FileQuestion,
      },
      {
        title: "مكتبة الفيديو",
        href: "/videos",
        icon: Video,
      },
    ],
  },
  {
    label: "البث المباشر",
    items: [
      {
        title: "الفصول الافتراضية",
        href: "/live-classes",
        icon: MonitorPlay,
      },
    ],
  },
  {
    label: "المستخدمين والأمان",
    items: [
      {
        title: "المستخدمين",
        href: "/users",
        icon: Users,
      },
      {
        title: "الصلاحيات والأدوار",
        href: "/roles",
        icon: ShieldCheck,
      },
    ],
  },
  {
    label: "المالية والتسويق",
    items: [
      {
        title: "الاشتراكات والفواتير",
        href: "/billing",
        icon: CreditCard,
      },
      {
        title: "بوابات الدفع",
        href: "/gateways",
        icon: Banknote,
      },
      {
        title: "الكوبونات",
        href: "/coupons",
        icon: Ticket,
      },
    ],
  },
  {
    label: "التحكم والصيانة",
    items: [
      {
        title: "إدارة الصفحات",
        href: "/cms",
        icon: LayoutTemplate,
      },
      {
        title: "المساعد الذكي",
        href: "/ai-agent",
        icon: Bot,
      },
      {
        title: "سجلات النظام",
        href: "/logs",
        icon: Activity,
      },
      {
        title: "الإعدادات العامة",
        href: "/settings",
        icon: Settings,
      },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-l border-sidebar-border bg-sidebar text-sidebar-foreground flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <h2 className="text-xl font-bold">منصة التعليم التكيفي</h2>
        <p className="text-sm text-muted-foreground mt-1">لوحة التحكم</p>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-6">
        {menuGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="space-y-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2">
              {group.label}
            </h3>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "hover:bg-sidebar-accent/50 text-sidebar-foreground/70 hover:text-sidebar-foreground"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="text-xs text-muted-foreground text-center">
          © 2024 منصة التعليم التكيفي
        </div>
      </div>
    </aside>
  );
}
