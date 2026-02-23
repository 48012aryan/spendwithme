import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-white font-sans transition-colors duration-500 overflow-x-hidden">
      
      {/* Navigation - Glassmorphism */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto border-b border-gray-200/50 dark:border-gray-800/50 bg-white/70 dark:bg-[#030712]/70 backdrop-blur-xl sticky top-0 z-50 transition-colors duration-500">
        <div className="text-xl md:text-2xl font-extrabold tracking-tight flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300 group-hover:scale-110">
            <span className="text-white text-lg leading-none">₹</span>
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-gray-300">SpendWithMe</span>
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link 
            to="/signup" 
            className="bg-slate-900 dark:bg-white text-white dark:text-black px-6 py-2.5 rounded-full font-semibold hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white transition-all duration-300 text-sm shadow-md hover:shadow-blue-500/30 hover:-translate-y-0.5"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24 flex flex-col items-center text-center relative">
        {/* Glow Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-600/10 blur-[120px] rounded-full -z-10 pointer-events-none"></div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight animate-fade-in-up">
          Take Control of Your <br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:via-indigo-400 dark:to-teal-300 drop-shadow-sm">
            Financial Future.
          </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          The habit of tracking expenses builds the foundation of wealth. Start your journey to financial freedom today!
        </p>
        <Link 
          to="/signup" 
          className="group relative inline-flex items-center justify-center bg-slate-900 dark:bg-white text-white dark:text-black px-8 py-4 rounded-full text-base font-bold transition-all duration-300 hover:scale-105 hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white shadow-xl hover:shadow-[0_0_30px_rgba(37,99,235,0.4)]"
        >
          <span>Get Started Now</span>
          <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </Link>
      </main>

      {/* Why Choose Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-gray-200/50 dark:border-gray-800/50 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose SpendWithMe?</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Track Expenses", desc: "Monitor your spending patterns with intuitive visualizations and detailed breakdowns.", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" },
            { title: "Smart Budgeting", desc: "Create personalized budgets and get intelligent suggestions to help you save more.", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
            { title: "Financial Insights", desc: "Gain valuable insights into your spending habits and make informed financial decisions.", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" }
          ].map((card, i) => (
            <div key={i} className="group bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-8 rounded-2xl hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl dark:hover:shadow-blue-900/20">
              <div className="w-14 h-14 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={card.icon}></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-3">{card.title}</h3>
              <p className="text-slate-600 dark:text-gray-400 leading-relaxed text-sm">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="border-t border-gray-200/50 dark:border-gray-800/50 bg-white dark:bg-[#020617] py-24 transition-colors duration-500 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-20">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8 relative">
            
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-8 left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-20 -z-10"></div>

            {[
              { title: "Sign Up & Connect", desc: "Create your account and securely link your financial accounts." },
              { title: "Track Your Expenses", desc: "Automatically categorize and track your daily spending." },
              { title: "Get Insights", desc: "Receive personalized insights and spending analysis." },
              { title: "Build Wealth", desc: "Make informed decisions and grow your savings." }
            ].map((step, i) => (
              <div key={i} className="text-center group">
                <div className="w-16 h-16 bg-white dark:bg-[#0f172a] border-2 border-slate-200 dark:border-gray-800 group-hover:border-blue-500 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6 text-slate-900 dark:text-white transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                  {i + 1}
                </div>
                <h4 className="text-lg font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{step.title}</h4>
                <p className="text-slate-600 dark:text-gray-400 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Developers Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-gray-200/50 dark:border-gray-800/50">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Meet Our Developers</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Devansh Dholiya", role: "Front End Developer", initials: "DD", desc: "Expert in React. js. Focuseing on creating user interfaces and responsive web applications." },
            { name: "Harmin Kalathiya", role: "Full Stack Web Developer", initials: "HK", desc: "Expert in Next. js, React. js and Node. js development. Focuses on creating scalable database solutions and responsive web applications." },
            { name: "Rishi Daxini", role: "Front End developer", initials: "RD", desc: "Expert in React. js. Focuses on creating scalable database solutions and responsive web applications." },
            { name: "Parth Devaliya", role: "Back End Developer", initials: "PD", desc: "Expert in React. js. Focuseing on creating user interfaces and responsive web applications." },
          ].map((dev, i) => (
            <div key={i} className="group bg-white dark:bg-[#0f172a]/50 border border-gray-200 dark:border-gray-800 p-8 rounded-2xl flex flex-col items-center text-center hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl dark:hover:shadow-blue-900/20">
              <div className="w-20 h-20 bg-slate-50 dark:bg-[#030712] rounded-full flex items-center justify-center text-2xl font-bold text-slate-900 dark:text-white mb-5 border border-gray-200 dark:border-gray-800 group-hover:border-blue-500 group-hover:text-blue-500 transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(37,99,235,0.2)]">
                {dev.initials}
              </div>
              <h4 className="text-lg font-bold mb-1">{dev.name}</h4>
              <p className="text-blue-600 dark:text-blue-400 text-xs font-bold mb-4 tracking-widest uppercase">{dev.role}</p>
              <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">{dev.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-slate-900 dark:bg-[#0f172a] border-t border-gray-800 py-24 transition-colors duration-500 relative overflow-hidden text-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-blue-600/20 blur-[100px] pointer-events-none"></div>
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black mb-6">Ready to Take Control?</h2>
          <p className="text-slate-300 dark:text-blue-200/70 mb-10 text-lg md:text-xl">Join thousands of smart spenders making better financial decisions.</p>
          <Link 
            to="/signup" 
            className="group inline-flex items-center justify-center bg-white text-slate-900 px-8 py-4 rounded-full font-bold hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(37,99,235,0.5)] hover:-translate-y-1"
          >
            Start Your Journey Now
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </Link>
        </div>
      </section>

    </div>
  );
}