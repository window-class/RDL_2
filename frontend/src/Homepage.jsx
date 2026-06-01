import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Fixed import
import { useAuth } from "./App";

function Homepage() {
  const { logoutUser, user } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      {/* --- HEADER --- */}
      <header className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-sm border-b border-slate-200 flex justify-between items-center p-4 z-50 shadow-sm">
        <Link to="/" className="flex items-center gap-3 text-xl md:text-2xl font-bold text-slate-800 transition-colors hover:text-emerald-600">
          <CarSilhouetteIcon size="28" className="text-emerald-600" />
          RDLMS Portal
        </Link>

        <div className="hidden md:flex items-center space-x-2">
          <NavLink to="/GetCandidate" icon={<UsersIcon />} text="Candidates" />
          <NavLink to="/GetGrade" icon={<BarChartIcon />} text="Grades" />
          <NavLink to="/GetSupervisor" icon={<BriefcaseIcon />} text="Supervisors" />
          <NavLink to="/report" icon={<FileTextIcon />} text="Report" />
          <button onClick={handleLogout} className="ml-4 px-5 py-2 font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors flex items-center gap-2">
            <LogOutIcon /> Logout
          </button>
        </div>

        <button className="md:hidden p-2" onClick={toggleMenu}>
          <div className="w-6 h-5 flex flex-col justify-between items-center text-slate-600">
            <span className={`block w-6 h-0.5 bg-current transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-current ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-current transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
          </div>
        </button>
      </header>

      {/* --- MOBILE MENU --- */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-[65px] left-0 w-full bg-white border-b border-slate-200 z-40 shadow-lg p-4 flex flex-col space-y-2">
          <MobileNavLink to="/GetCandidate" icon={<UsersIcon />} text="Candidates" onClick={toggleMenu} />
          <MobileNavLink to="/GetGrade" icon={<BarChartIcon />} text="Grades" onClick={toggleMenu} />
          <MobileNavLink to="/GetSupervisor" icon={<BriefcaseIcon />} text="Supervisors" onClick={toggleMenu} />
          <MobileNavLink to="/report" icon={<FileTextIcon />} text="Report" onClick={toggleMenu} />
          <button onClick={handleLogout} className="flex items-center gap-3 p-3 text-red-600 font-medium"><LogOutIcon /> Logout</button>
        </div>
      )}

      {/* --- MAIN CONTENT --- */}
      <main className="pt-24 pb-40 px-4 md:px-8 max-w-7xl mx-auto w-full flex-grow">
        
        {/* Welcome & Simulation Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between overflow-hidden relative">
            <div className="relative z-10">
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">
                Hello, <span className="text-emerald-600">{user?.username || 'Officer'}</span>
              </h1>
              <p className="text-slate-500 text-lg max-w-md">
                Monitoring and managing the Rwanda National Driving License examination process.
              </p>
            </div>

            {/* ANIMATED TEST ZONE */}
            <div className="mt-12 relative h-32 bg-slate-50 rounded-2xl border border-dashed border-slate-200 overflow-hidden">
               {/* The Road */}
               <div className="absolute bottom-6 left-0 w-full h-1 bg-slate-200"></div>
               
               {/* Policeman (Stationary) */}
               <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <div className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full mb-1 border border-emerald-200">SUPERVISOR</div>
                  <PoliceIcon size="40" className="text-slate-700" />
               </div>

               {/* Target Category Marker */}
               <div className="absolute bottom-8 right-20 flex flex-col items-center">
                  <div className="w-8 h-8 rounded bg-amber-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">B</div>
                  <div className="w-1 h-4 bg-slate-400"></div>
               </div>

               {/* Animated Car */}
               <div className="absolute bottom-4 animate-drive-across">
                  <div className="relative">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white shadow-md text-[10px] px-2 py-0.5 rounded border border-slate-100 font-bold whitespace-nowrap">
                        CANDIDATE #240
                    </div>
                    <CarSilhouetteIcon size="48" className="text-blue-600" />
                  </div>
               </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-emerald-600 rounded-3xl p-8 text-white shadow-lg flex flex-col justify-center">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <ZapIcon className="text-emerald-200" /> Quick Entry
            </h2>
            <div className="space-y-3">
              <ActionButtonLight to="/AddCandidate" text="New Candidate" />
              <ActionButtonLight to="/AddGrade" text="Submit Grade" />
              <ActionButtonLight to="/AddSupervisor" text="Assign Officer" />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard to="/GetCandidate" title=" Candidates" desc="Available candidates" icon={<UsersIcon size="28" />} color="blue" />
          <StatCard to="/GetGrade" title="Exam Grades" desc="View passed or failed candidates" icon={<BarChartIcon size="28" />} color="emerald" />
          <StatCard to="/GetSupervisor" title="Supervisors" desc="Manage and view supervisor information" icon={<BriefcaseIcon size="28" />} color="amber" />
          <StatCard to="/report" title="Reports" desc="All records securely stored" icon={<FileTextIcon size="28" />} color="indigo" />
        </div>

  
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Operations Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureItem title="Biometric Sync" desc="Automated verification of candidate identity via national ID." />
            <FeatureItem title="Real-time Grading" desc="Supervisors upload marks instantly from the field." />
            <FeatureItem title="Secure Reporting" desc="Encrypted PDF generation for official traffic records." />
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-md border-t border-slate-200 text-slate-600 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm">
            <span className="font-bold text-slate-800">RDLMS Rwanda</span> &copy; 2026 Official Portal
          </div>
          <div className="flex gap-6 text-xs font-semibold uppercase tracking-wider">
            <a href="#" className="hover:text-emerald-600">We value everyone</a>
            <a href="#" className="hover:text-emerald-600">Support Center</a>
            <a href="#" className="hover:text-emerald-600">Contact: +250 788 000 000</a>
          </div>
        </div>
      </footer>

      {/* Global CSS for Driving Animation */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes drive {
          0% { left: -100px; }
          100% { left: 110%; }
        }
        .animate-drive-across {
          position: absolute;
          animation: drive 8s linear infinite;
        }
      `}} />
    </div>
  );
}


const NavLink = ({ to, text, icon }) => (
  <Link to={to} className="flex items-center gap-2 px-3 py-2 font-medium text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all">
    {icon} <span>{text}</span>
  </Link>
);

const MobileNavLink = ({ to, text, icon, onClick }) => (
  <Link to={to} onClick={onClick} className="flex items-center gap-3 p-3 font-medium text-slate-700 hover:bg-slate-50 rounded-xl">
    {icon} {text}
  </Link>
);

const ActionButtonLight = ({ to, text }) => (
  <Link to={to} className="flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-3 px-6 rounded-2xl transition-all">
    <PlusIcon size="18" className="mr-2" /> {text}
  </Link>
);

const StatCard = ({ to, title, desc, icon, color }) => {
  const themes = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
  };
  return (
    <Link to={to} className={`p-6 rounded-3xl border-2 transition-all hover:scale-[1.02] shadow-sm ${themes[color]}`}>
      <div className="mb-4">{icon}</div>
      <h3 className="font-bold text-slate-800 text-lg">{title}</h3>
      <p className="text-slate-500 text-sm font-medium">{desc}</p>
    </Link>
  );
};

const FeatureItem = ({ title, desc }) => (
  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
      <CheckCircleIcon size="18" />
    </div>
    <h4 className="font-bold text-slate-800 mb-1">{title}</h4>
    <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
  </div>
);

// --- SVG ICONS ---
const PoliceIcon = ({ size = "24", className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2a5 5 0 0 1 5 5v3H7V7a5 5 0 0 1 5-5z"/><path d="M6 10h12v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V10z"/><path d="M12 14v3"/><path d="M10 10V8a2 2 0 0 1 4 0v2"/>
  </svg>
);
const CarSilhouetteIcon = ({ size = "20", className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>
  </svg>
);
const UsersIcon = ({ size = "20" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);
const BarChartIcon = ({ size = "20" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>
);
const BriefcaseIcon = ({ size = "20" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
);
const FileTextIcon = ({ size = "20" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
);
const LogOutIcon = ({ size = "20" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
);
const ZapIcon = ({ className = "" }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
);
const PlusIcon = ({ size = "20", className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={className}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
);
const CheckCircleIcon = ({ size = "20" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);

export default Homepage;