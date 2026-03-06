import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import apiClient from "../api/axios";

export default function Budget() {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Backend Data States
  const [summary, setSummary] = useState({ TotalBudget: "0", Remaining: "0", Spent: "0", UsagePercentage: 0 });
  const [budgetDetails, setBudgetDetails] = useState([]);

  // Theme Logic
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Fetch Budget Data on Load
  useEffect(() => {
    fetchBudgetData();
  }, []);

  const fetchBudgetData = async () => {
    setIsLoading(true);
    try {
      const currentMonth = new Date().toISOString(); // Matches backend new Date(month) requirement
      const response = await apiClient.post("/budget/all-budget-history", { month: currentMonth });
      
      const { summary, budgetDetails } = response.data.data;
      setSummary(summary);
      setBudgetDetails(budgetDetails);
    } catch (error) {
      console.error("Error fetching budget data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444', '#EC4899'];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const NavItem = ({ to, label, iconPath, id }) => (
    <Link
      to={to}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl transition-all duration-300 font-medium ${
        id === "budget" 
          ? "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-bold shadow-sm" 
          : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
      }`}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={id === "budget" ? 2.5 : 2} d={iconPath} />
      </svg>
      <span className="hidden sm:block">{label}</span>
    </Link>
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500 overflow-hidden text-gray-900 dark:text-white relative">
      
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-emerald-300/20 dark:bg-emerald-900/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-teal-300/20 dark:bg-teal-900/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* --- TOP NAVBAR --- */}
      <nav className="relative z-20 bg-white/70 dark:bg-gray-800/60 backdrop-blur-2xl border-b border-white/50 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-500 text-white flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h1 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400 hidden lg:block tracking-tight">SpendWithMe</h1>
          </div>

          <div className="flex space-x-2">
            <NavItem to="/dashboard" id="dashboard" label="Dashboard" iconPath="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            <NavItem to="/budget" id="budget" label="Budgets" iconPath="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setIsDark(!isDark)} className="p-2.5 bg-gray-100 dark:bg-gray-700/50 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              {isDark ? <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0z" /></svg> : <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>}
            </button>
            <button onClick={handleLogout} className="hidden sm:block px-4 py-2 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-xl font-bold">Logout</button>
          </div>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 relative z-10 max-w-7xl mx-auto w-full">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        ) : (
          <>
            <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Budget Tracking</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Summary for the current month.</p>
              </div>
              <div className="bg-white/70 dark:bg-gray-800/60 backdrop-blur-xl p-4 rounded-3xl border border-white/50 dark:border-gray-700/50 shadow-sm flex gap-6">
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Total Budget</p>
                  <p className="text-lg font-black text-emerald-600 dark:text-emerald-400">${summary.TotalBudget}</p>
                </div>
                <div className="w-px bg-gray-200 dark:bg-gray-700"></div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Remaining</p>
                  <p className="text-lg font-black text-gray-900 dark:text-white">${summary.Remaining}</p>
                </div>
              </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Category Budgets */}
              <div className="bg-white/70 dark:bg-gray-800/60 backdrop-blur-2xl rounded-[2.5rem] border border-white/50 dark:border-gray-700/50 p-8 shadow-sm">
                <h3 className="text-xl font-bold mb-8">Monthly Categories</h3>
                <div className="space-y-8">
                  {budgetDetails.length > 0 ? budgetDetails.map((item, index) => (
                    <div key={index} className="space-y-3 group">
                      <div className="flex justify-between items-end">
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-emerald-500 transition-colors">{item.category}</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Spent <span className={item.Status > 100 ? 'text-red-500 font-bold' : 'font-semibold text-gray-700 dark:text-gray-300'}>${item.Spent}</span> of ${item.Allocated}
                          </p>
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded-lg ${item.Status > 100 ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
                          {item.Status}%
                        </span>
                      </div>
                      <div className="h-3 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-1000" 
                          style={{ 
                            width: `${Math.min(item.Status, 100)}%`, 
                            backgroundColor: item.Status > 100 ? '#EF4444' : COLORS[index % COLORS.length] 
                          }}
                        ></div>
                      </div>
                    </div>
                  )) : (
                    <p className="text-center text-gray-400 py-10">No budget data for this month.</p>
                  )}
                </div>
              </div>

              {/* Distribution & Insights */}
              <div className="space-y-8">
                <div className="bg-white/70 dark:bg-gray-800/60 backdrop-blur-2xl rounded-[2.5rem] border border-white/50 dark:border-gray-700/50 p-8 shadow-sm">
                  <h3 className="text-xl font-bold mb-4">Spending Distribution</h3>
                  <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie 
                          data={budgetDetails.map(d => ({ name: d.category, value: parseFloat(d.Spent.replace(/,/g, '')) }))} 
                          cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={8} dataKey="value"
                        >
                          {budgetDetails.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                        </Pie>
                        <Tooltip contentStyle={{ borderRadius: '1rem', border: 'none', backgroundColor: isDark ? '#1F2937' : '#fff', color: isDark ? '#fff' : '#000' }} />
                        <Legend verticalAlign="bottom" height={36}/>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-emerald-500 rounded-[2.5rem] p-8 text-white shadow-lg relative overflow-hidden group">
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-2">Smart Tip 💡</h3>
                    <p className="text-emerald-50 text-sm leading-relaxed opacity-90">
                      Your current usage is at <span className="font-bold underline">{summary.UsagePercentage}%</span>. 
                      {summary.UsagePercentage > 80 ? " You're close to your limit! Try reducing non-essential spending." : " You're doing great at managing your budget this month!"}
                    </p>
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}