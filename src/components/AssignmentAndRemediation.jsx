import { useMemo, useState } from 'react';
import { Users, ClipboardCheck, Wrench } from 'lucide-react';

const initialRows = [
  { id: 'CVE-2024-12345', title: 'OpenSSL buffer overflow', severity: 'Critical', owner: 'Alice', autoTest: true, due: '2025-11-12' },
  { id: 'CVE-2024-22311', title: 'Container runtime bypass', severity: 'High', owner: 'Bob', autoTest: false, due: '2025-11-18' },
  { id: 'GHSA-abc1-xyz9', title: 'Node.js dependency vuln', severity: 'Medium', owner: 'Unassigned', autoTest: true, due: '2025-12-01' },
  { id: 'CVE-2023-88901', title: 'Kernel privilege escalation', severity: 'High', owner: 'Carol', autoTest: false, due: '2025-11-21' },
];

const people = ['Unassigned', 'Alice', 'Bob', 'Carol', 'David'];

function SeverityPill({ s }) {
  const map = {
    Critical: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    High: 'bg-orange-500/15 text-orange-300 border-orange-500/30',
    Medium: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    Low: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  };
  return <span className={`text-xs px-2 py-0.5 rounded-full border ${map[s]}`}>{s}</span>;
}

export default function AssignmentAndRemediation() {
  const [rows, setRows] = useState(initialRows);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query) return rows;
    return rows.filter((r) =>
      [r.id, r.title, r.owner, r.severity].join(' ').toLowerCase().includes(query.toLowerCase())
    );
  }, [rows, query]);

  const updateRow = (id, patch) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Assignments & Remediation Testing</h2>
        <p className="text-sm text-slate-400">Assign owners, set due dates, and enable automatic fix validation</p>
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by CVE, title, owner, severity"
            className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-sm placeholder:text-slate-500"
          />
        </div>
        <button className="inline-flex items-center gap-2 rounded-md bg-emerald-600 hover:bg-emerald-500 px-3 py-2 text-sm">
          <ClipboardCheck className="h-4 w-4" />
          Export selection
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-900/60 text-slate-300">
            <tr>
              <th className="text-left px-4 py-3">Vulnerability</th>
              <th className="text-left px-4 py-3">Severity</th>
              <th className="text-left px-4 py-3">Owner</th>
              <th className="text-left px-4 py-3">Due</th>
              <th className="text-left px-4 py-3">Auto Test</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {filtered.map((r) => (
              <tr key={r.id} className="hover:bg-slate-900/40">
                <td className="px-4 py-3">
                  <div className="font-medium">{r.id}</div>
                  <div className="text-xs text-slate-400">{r.title}</div>
                </td>
                <td className="px-4 py-3"><SeverityPill s={r.severity} /></td>
                <td className="px-4 py-3">
                  <div className="inline-flex items-center gap-2">
                    <Users className="h-4 w-4 text-slate-400" />
                    <select
                      value={r.owner}
                      onChange={(e) => updateRow(r.id, { owner: e.target.value })}
                      className="bg-slate-950 border border-slate-800 rounded-md px-2 py-1"
                    >
                      {people.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <input
                    type="date"
                    value={r.due}
                    onChange={(e) => updateRow(r.id, { due: e.target.value })}
                    className="bg-slate-950 border border-slate-800 rounded-md px-2 py-1"
                  />
                </td>
                <td className="px-4 py-3">
                  <label className="inline-flex items-center gap-2 text-xs">
                    <input
                      type="checkbox"
                      checked={r.autoTest}
                      onChange={(e) => updateRow(r.id, { autoTest: e.target.checked })}
                      className="accent-emerald-500"
                    />
                    Enable
                  </label>
                </td>
                <td className="px-4 py-3 text-right">
                  <button className="inline-flex items-center gap-2 rounded-md bg-slate-800 hover:bg-slate-700 px-3 py-1.5">
                    <Wrench className="h-4 w-4" />
                    Trigger test
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
