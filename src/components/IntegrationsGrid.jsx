import { Plug, Cloud, Bug, Server, Settings } from 'lucide-react';
import { useState } from 'react';

const tools = [
  { name: 'Qualys', desc: 'Network & host vulnerability scanning', icon: Server, color: 'from-cyan-500 to-blue-500' },
  { name: 'Prisma Cloud', desc: 'Cloud posture & runtime security', icon: Cloud, color: 'from-emerald-500 to-teal-500' },
  { name: 'Wiz', desc: 'Cloud & container security insights', icon: Cloud, color: 'from-indigo-500 to-violet-500' },
  { name: 'Nessus', desc: 'Comprehensive vulnerability scanning', icon: Bug, color: 'from-amber-500 to-orange-500' },
  { name: 'Snyk', desc: 'Developer-first dependency security', icon: Bug, color: 'from-pink-500 to-rose-500' },
  { name: 'ServiceNow', desc: 'ITSM workflow integration', icon: Settings, color: 'from-lime-500 to-green-500' },
  { name: 'Jira', desc: 'Issue tracking & sprint workflows', icon: Settings, color: 'from-sky-500 to-cyan-500' },
];

function IntegrationCard({ name, desc, icon: Icon, color }) {
  const [connected, setConnected] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [sync, setSync] = useState(true);

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${color} grid place-items-center`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
          <div>
            <h4 className="font-medium">{name}</h4>
            <p className="text-xs text-slate-400">{desc}</p>
          </div>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full border ${connected ? 'border-emerald-500/30 text-emerald-300 bg-emerald-500/10' : 'border-slate-700 text-slate-300 bg-slate-800'}`}>
          {connected ? 'Connected' : 'Disconnected'}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder={`${name} API token`}
          className="bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-sm placeholder:text-slate-500"
        />
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={sync}
              onChange={(e) => setSync(e.target.checked)}
              className="accent-emerald-500"
            />
            Enable auto-sync
          </label>
          <button
            onClick={() => setConnected((v) => !v)}
            className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
              connected ? 'bg-slate-800 hover:bg-slate-700' : 'bg-emerald-600 hover:bg-emerald-500'
            }`}
          >
            <Plug className="h-4 w-4" />
            {connected ? 'Disconnect' : 'Connect'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function IntegrationsGrid() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Integrations</h2>
        <p className="text-sm text-slate-400">Connect scanners and workflow tools to unify your view</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((t) => (
          <IntegrationCard key={t.name} {...t} />
        ))}
      </div>
    </div>
  );
}
