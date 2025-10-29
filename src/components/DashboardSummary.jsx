import { AlertTriangle, CheckCircle2, Activity, Wrench } from 'lucide-react';

const kpis = [
  {
    label: 'Total Vulnerabilities',
    value: '3,482',
    delta: '+4.1% this week',
    icon: AlertTriangle,
    tone: 'from-amber-500 to-orange-500',
  },
  {
    label: 'Critical & High',
    value: '427',
    delta: '-2.3% this week',
    icon: Activity,
    tone: 'from-rose-500 to-pink-500',
  },
  {
    label: 'Remediated',
    value: '2,914',
    delta: '+6.0% this week',
    icon: CheckCircle2,
    tone: 'from-emerald-500 to-teal-500',
  },
  {
    label: 'Awaiting Fix',
    value: '568',
    delta: 'SLA: 7.2 days avg',
    icon: Wrench,
    tone: 'from-cyan-500 to-blue-500',
  },
];

const mockPrioritized = [
  {
    id: 'CVE-2024-12345',
    title: 'OpenSSL buffer overflow allows RCE',
    severity: 'Critical',
    risk: 9.8,
    source: 'Qualys',
    assets: 142,
    status: 'Assigned',
  },
  {
    id: 'CVE-2024-22311',
    title: 'Container escape via misconfigured runtime',
    severity: 'High',
    risk: 8.7,
    source: 'Prisma Cloud',
    assets: 67,
    status: 'In Testing',
  },
  {
    id: 'GHSA-abc1-xyz9',
    title: 'Dependency vulnerability in Node.js service',
    severity: 'Medium',
    risk: 6.5,
    source: 'Snyk',
    assets: 211,
    status: 'Unassigned',
  },
];

function SeverityBadge({ level }) {
  const map = {
    Critical: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    High: 'bg-orange-500/15 text-orange-300 border-orange-500/30',
    Medium: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    Low: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs ${map[level] || ''}`}>
      {level}
    </span>
  );
}

export default function DashboardSummary() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Consolidated Dashboard</h2>
        <p className="text-sm text-slate-400">Aggregated from Qualys, Prisma Cloud, Wiz, Nessus, and Snyk</p>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map(({ label, value, delta, icon: Icon, tone }) => (
          <div key={label} className="rounded-xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-4">
            <div className="flex items-center justify-between">
              <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${tone} grid place-items-center shadow-lg/10`}>
                <Icon className="h-5 w-5 text-white" />
              </div>
              <span className="text-xs text-slate-400">{delta}</span>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-semibold">{value}</div>
              <div className="text-sm text-slate-400">{label}</div>
            </div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl border border-slate-800 bg-slate-900/40">
          <div className="p-4 border-b border-slate-800">
            <h3 className="font-medium">Prioritized Vulnerabilities</h3>
            <p className="text-xs text-slate-400">Sorted by exploitability, asset criticality, and exposure</p>
          </div>
          <ul className="divide-y divide-slate-800">
            {mockPrioritized.map((item) => (
              <li key={item.id} className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="space-y-1">
                  <div className="text-sm font-medium">{item.id} — {item.title}</div>
                  <div className="text-xs text-slate-400">Source: {item.source} • Affected assets: {item.assets}</div>
                </div>
                <div className="flex items-center gap-2">
                  <SeverityBadge level={item.severity} />
                  <span className="text-xs text-slate-300">Risk: {item.risk}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700">{item.status}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
          <h3 className="font-medium mb-3">Remediation Progress</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Critical</span><span>74%</span>
              </div>
              <div className="h-2 rounded bg-slate-800 overflow-hidden">
                <div className="h-full w-[74%] bg-gradient-to-r from-rose-500 to-pink-500"></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>High</span><span>62%</span>
              </div>
              <div className="h-2 rounded bg-slate-800 overflow-hidden">
                <div className="h-full w-[62%] bg-gradient-to-r from-orange-500 to-amber-500"></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Medium</span><span>81%</span>
              </div>
              <div className="h-2 rounded bg-slate-800 overflow-hidden">
                <div className="h-full w-[81%] bg-gradient-to-r from-emerald-500 to-teal-500"></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Low</span><span>93%</span>
              </div>
              <div className="h-2 rounded bg-slate-800 overflow-hidden">
                <div className="h-full w-[93%] bg-gradient-to-r from-cyan-500 to-blue-500"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
