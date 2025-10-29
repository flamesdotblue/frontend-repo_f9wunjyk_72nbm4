import { FileText, Shield, CheckCircle2 } from 'lucide-react';

const compliance = [
  { framework: 'ISO 27001', score: 92, status: 'On Track' },
  { framework: 'SOC 2', score: 88, status: 'At Risk' },
  { framework: 'PCI DSS', score: 81, status: 'On Track' },
  { framework: 'CIS Benchmarks', score: 76, status: 'Needs Attention' },
];

export default function ExecutiveReports() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Executive Overview</h2>
        <button className="inline-flex items-center gap-2 rounded-md bg-emerald-600 hover:bg-emerald-500 px-3 py-2 text-sm">
          <FileText className="h-4 w-4" />
          Download Report
        </button>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl border border-slate-800 bg-slate-900/40 p-4">
          <h3 className="font-medium mb-4">Risk Posture Summary</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <Shield className="h-4 w-4 mt-0.5 text-rose-400" />
              <span><span className="font-medium">427</span> Critical/High issues remain across crown-jewel assets.</span>
            </li>
            <li className="flex items-start gap-2">
              <Shield className="h-4 w-4 mt-0.5 text-amber-400" />
              <span>Mean time to remediate improved to <span className="font-medium">7.2 days</span> this quarter.</span>
            </li>
            <li className="flex items-start gap-2">
              <Shield className="h-4 w-4 mt-0.5 text-emerald-400" />
              <span><span className="font-medium">81%</span> of medium-risk issues are within SLA.</span>
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
          <h3 className="font-medium mb-4">SLA Status</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span>Critical</span>
              <span className="text-rose-300">62% within SLA</span>
            </div>
            <div className="h-2 rounded bg-slate-800 overflow-hidden">
              <div className="h-full w-[62%] bg-gradient-to-r from-rose-500 to-pink-500"></div>
            </div>
            <div className="flex items-center justify-between">
              <span>High</span>
              <span className="text-orange-300">71% within SLA</span>
            </div>
            <div className="h-2 rounded bg-slate-800 overflow-hidden">
              <div className="h-full w-[71%] bg-gradient-to-r from-orange-500 to-amber-500"></div>
            </div>
            <div className="flex items-center justify-between">
              <span>Medium</span>
              <span className="text-emerald-300">84% within SLA</span>
            </div>
            <div className="h-2 rounded bg-slate-800 overflow-hidden">
              <div className="h-full w-[84%] bg-gradient-to-r from-emerald-500 to-teal-500"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-800 bg-slate-900/40">
        <div className="p-4 border-b border-slate-800">
          <h3 className="font-medium">Compliance Overview</h3>
          <p className="text-xs text-slate-400">Status against key frameworks</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          {compliance.map((c) => (
            <div key={c.framework} className="rounded-lg border border-slate-800 bg-slate-950 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{c.framework}</span>
                <CheckCircle2 className={`h-4 w-4 ${c.score > 85 ? 'text-emerald-400' : c.score > 80 ? 'text-amber-400' : 'text-rose-400'}`} />
              </div>
              <div className="text-2xl font-semibold">{c.score}%</div>
              <div className="text-xs text-slate-400">{c.status}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
