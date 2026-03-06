import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import apiClient from "../api/axios";

export default function Dashboard() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // Theme Toggle State
  const [isDark, setIsDark] = useState(false);

  // Apply dark mode class to HTML element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // --- MOCK DATA FOR CHARTS AND STATS ---
  const [stats, setStats] = useState({ balance: 5240.50, income: 8500.00, expenses: 3259.50 });
  const [transactions, setTransactions] = useState([
    { id: 1, title: "Whole Foods", amount: -120.50, date: "Today", type: "expense", icon: "🛒", color: "bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400" },
    { id: 2, title: "Salary", amount: 4500.00, date: "Yesterday", type: "income", icon: "💼", color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400" },
    { id: 3, title: "Netflix", amount: -15.99, date: "Feb 20", type: "expense", icon: "🎬", color: "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400" },
    { id: 4, title: "Uber Ride", amount: -24.00, date: "Feb 19", type: "expense", icon: "🚗", color: "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400" },
  ]);

  const chartData = [
    { name: 'Mon', income: 400, expense: 240 },
    { name: 'Tue', income: 300, expense: 139 },
    { name: 'Wed', income: 200, expense: 980 },
    { name: 'Thu', income: 278, expense: 390 },
    { name: 'Fri', income: 189, expense: 480 },
    { name: 'Sat', income: 239, expense: 380 },
    { name: 'Sun', income: 349, expense: 430 },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // --- SUB-COMPONENTS FOR TOP NAVBAR ---
  const NavItem = ({ id, label, iconPath }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl transition-all duration-300 font-medium ${
        activeTab === id 
          ? "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-bold shadow-sm" 
          : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
      }`}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={activeTab === id ? 2.5 : 2} d={iconPath} />
      </svg>
      <span className="hidden sm:block">{label}</span>
    </button>
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500 overflow-hidden text-gray-900 dark:text-white relative">
      
      {/* Background Animated Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-emerald-300/20 dark:bg-emerald-900/20 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-teal-300/20 dark:bg-teal-900/20 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* --- TOP NAVBAR --- */}
      <nav className="relative z-20 bg-white/70 dark:bg-gray-800/60 backdrop-blur-2xl border-b border-white/50 dark:border-gray-700/50 shadow-[0_4px_24px_rgb(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-500 text-white shadow-lg shadow-emerald-500/30">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h1 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400 tracking-tight hidden lg:block">
                SpendWithMe
              </h1>
            </div>

            {/* Center Navigation Links */}
            <div className="flex space-x-1 sm:space-x-2 overflow-x-auto no-scrollbar">
              <NavItem id="dashboard" label="Dashboard" iconPath="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              <NavItem id="history" label="History" iconPath="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              <NavItem id="budget" label="Budgets" iconPath="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              <NavItem id="group" label="Groups" iconPath="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Theme Toggle Button */}
              <button 
                onClick={() => setIsDark(!isDark)}
                className="p-2.5 bg-gray-100 dark:bg-gray-700/50 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Toggle Dark Mode"
              >
                {isDark ? (
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" /></svg>
                ) : (
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
                )}
              </button>

              <button onClick={handleLogout} className="hidden sm:flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 rounded-xl transition-colors font-bold shadow-sm">
                <span className="hidden lg:block">Logout</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 z-10 relative max-w-7xl mx-auto w-full">
        
        {/* Dynamic Header Based on Tab */}
        <header className="mb-8 mt-2">
          <h2 className="text-3xl font-extrabold capitalize text-gray-900 dark:text-white">
            {activeTab} Overview
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Track, manage, and analyze your finances.
          </p>
        </header>

        {/* Dynamic Content Rendering based on Active Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-8 animate-fade-in-up">
            
            {/* 1. STATS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Balance Card */}
              <div className="relative overflow-hidden bg-gradient-to-br from-teal-500 to-emerald-600 rounded-[2rem] p-6 text-white shadow-lg hover:-translate-y-1 transition-transform group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                <h3 className="text-emerald-50 text-sm font-medium mb-2">Total Balance</h3>
                <div className="text-4xl font-extrabold tracking-tight mb-2">
                  ${stats.balance.toLocaleString()}
                </div>
                <div className="text-sm bg-white/20 inline-block px-3 py-1 rounded-full backdrop-blur-md">
                  +2.5% this month
                </div>
              </div>

              {/* Income Card */}
              <div className="bg-white/70 dark:bg-gray-800/60 backdrop-blur-xl rounded-[2rem] p-6 border border-white/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
                </div>
                <h4 className="text-gray-500 dark:text-gray-400 text-sm font-semibold mb-1">Total Income</h4>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">${stats.income.toLocaleString()}</div>
              </div>

              {/* Expense Card */}
              <div className="bg-white/70 dark:bg-gray-800/60 backdrop-blur-xl rounded-[2rem] p-6 border border-white/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-500/20 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6"/></svg>
                </div>
                <h4 className="text-gray-500 dark:text-gray-400 text-sm font-semibold mb-1">Total Expenses</h4>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">${stats.expenses.toLocaleString()}</div>
              </div>
            </div>

            {/* 2. CHART & TRANSACTIONS GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Chart Section */}
              <div className="lg:col-span-2 bg-white/70 dark:bg-gray-800/60 backdrop-blur-2xl rounded-[2rem] border border-white/50 dark:border-gray-700/50 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Cashflow Overview</h3>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#374151' : '#E5E7EB'} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: isDark ? '#9CA3AF' : '#6B7280', fontSize: 12}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: isDark ? '#9CA3AF' : '#6B7280', fontSize: 12}} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: isDark ? '#1F2937' : '#FFFFFF', borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                        itemStyle={{ fontWeight: 'bold' }}
                      />
                      <Area type="monotone" dataKey="income" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
                      <Area type="monotone" dataKey="expense" stroke="#EF4444" strokeWidth={3} fillOpacity={1} fill="url(#colorExpense)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recent Transactions List */}
              <div className="bg-white/70 dark:bg-gray-800/60 backdrop-blur-2xl rounded-[2rem] border border-white/50 dark:border-gray-700/50 p-6 shadow-sm flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent</h3>
                  <button className="text-sm font-bold text-emerald-500 hover:text-emerald-600">See All</button>
                </div>
                
                <div className="flex-1 space-y-4 overflow-y-auto pr-2">
                  {transactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-3 rounded-2xl hover:bg-white/50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 flex items-center justify-center rounded-xl text-lg ${tx.color}`}>
                          {tx.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-gray-900 dark:text-white">{tx.title}</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{tx.date}</p>
                        </div>
                      </div>
                      <div className={`font-bold text-sm ${tx.type === 'expense' ? 'text-gray-900 dark:text-white' : 'text-emerald-500'}`}>
                        {tx.type === 'expense' ? '-' : '+'}${Math.abs(tx.amount).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
                
                <button className="w-full mt-4 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/30 transition-transform transform hover:-translate-y-0.5">
                  + Add New
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Placeholder for other tabs */}
        {activeTab !== "dashboard" && (
          <div className="h-[60vh] flex flex-col items-center justify-center bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl rounded-[2rem] border border-white/50 dark:border-gray-700/50 shadow-sm animate-fade-in-up">
            <svg className="w-20 h-20 text-emerald-200 dark:text-emerald-900/50 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">The {activeTab} view is coming soon!</h3>
            <p className="text-gray-500 dark:text-gray-400">Ready to connect to your backend routes.</p>
          </div>
        )}
      </main>
    </div>
  );
}