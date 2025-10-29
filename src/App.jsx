import { useState } from 'react';
import { Shield, BarChart3, Plug, Users } from 'lucide-react';
import DashboardSummary from './components/DashboardSummary.jsx';
import IntegrationsGrid from './components/IntegrationsGrid.jsx';
import AssignmentAndRemediation from './components/AssignmentAndRemediation.jsx';
import ExecutiveReports from './components/ExecutiveReports.jsx';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'integrations', label: 'Integrations', icon: Plug },
    { id: 'assign', label: 'Assign & Test', icon: Users },
    { id: 'reports', label: 'Executive', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-20 border-b border-slate-800/60 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 grid place-items-center shadow-lg shadow-emerald-500/20">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight">VulnFusion</h1>
              <p className="text-xs text-slate-400">Unified vulnerability intelligence</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-2">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                  activeTab === id
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
                aria-current={activeTab === id ? 'page' : undefined}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </nav>

          <div className="md:hidden">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-md text-sm px-2 py-2"
            >
              {tabs.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6">
        {activeTab === 'dashboard' && <DashboardSummary />}
        {activeTab === 'integrations' && <IntegrationsGrid />}
        {activeTab === 'assign' && <AssignmentAndRemediation />}
        {activeTab === 'reports' && <ExecutiveReports />}
      </main>

      <footer className="border-t border-slate-800/60 mt-8">
        <div className="mx-auto max-w-7xl px-4 py-6 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} VulnFusion</span>
          <span>Built for security, compliance, and rapid remediation</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
