'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { LayoutDashboard, BookOpen, BarChart3, Settings, Award } from 'lucide-react';
import DynamicIcon from './DynamicIcon';

interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

export default function DashboardClient({ courses }: { courses: Course[] }) {
  const [activeTab, setActiveTab] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'courses', label: 'My Courses', icon: BookOpen },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-[#09090b] text-zinc-100 overflow-x-hidden font-sans">
      {/* SIDEBAR */}
      <nav className="hidden md:flex flex-col w-20 lg:w-64 border-r border-zinc-800/80 bg-[#09090b] p-4 sticky top-0 h-screen z-20">
        <div className="flex items-center gap-3 px-2 py-4 mb-8">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg">
            <Award className="h-5 w-5 text-white" />
          </div>
          <span className="hidden lg:block font-bold tracking-tight text-xl bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            NextGen <span className="text-purple-500 text-sm font-medium">v1</span>
          </span>
        </div>
        <ul className="space-y-1.5 flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <li key={item.id} className="relative">
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200 z-10 relative ${
                    isActive ? 'text-purple-400' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span className="hidden lg:block">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-highlight"
                      className="absolute inset-0 bg-purple-500/10 border border-purple-500/20 rounded-xl -z-10"
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* MAIN LAYOUT */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <header className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">Learning Hub</h1>
            <p className="text-zinc-400 text-sm mt-1">Hardware-accelerated analytics dashboard.</p>
          </div>
          <div className="flex items-center gap-3 bg-zinc-900/50 border border-zinc-800/80 px-4 py-2 rounded-xl backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold tracking-wider uppercase text-zinc-400">Database Live</span>
          </div>
        </header>

        <motion.section variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* HERO */}
          <motion.article variants={itemVariants} className="md:col-span-2 bg-gradient-to-br from-zinc-900 via-zinc-900 to-purple-950/20 border border-zinc-800/80 p-6 rounded-2xl relative overflow-hidden shadow-xl">
            <div className="relative z-10 flex flex-col h-full justify-between min-h-[140px]">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Welcome back, <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Harru</span> 👋</h2>
                <p className="text-zinc-400 text-sm mt-2 max-w-md">Ready to pick up right where you left off?</p>
              </div>
            </div>
          </motion.article>

          {/* DYNAMIC TILE */}
          {courses && courses.map((course) => (
            <motion.article key={course.id} variants={itemVariants} className="bg-zinc-900/40 border border-zinc-800/80 p-6 rounded-2xl flex flex-col justify-between min-h-[180px] shadow-lg">
              <div className="flex justify-between items-start">
                <div className="h-10 w-10 rounded-xl bg-zinc-800/80 border border-zinc-700/50 flex items-center justify-center text-purple-400">
                  <DynamicIcon name={course.icon_name} className="h-5 w-5" />
                </div>
                <span className="text-xs bg-zinc-800/60 text-zinc-400 px-2.5 py-1 rounded-full border border-zinc-800">{course.progress}%</span>
              </div>
              <div className="mt-4">
                <h4 className="font-bold text-zinc-100 tracking-tight text-base line-clamp-1">{course.title}</h4>
                <div className="mt-4 w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800/50">
                  <div className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500" style={{ width: `${course.progress}%` }} />
                </div>
              </div>
            </motion.article>
          ))}
        </motion.section>
      </main>
    </div>
  );
}