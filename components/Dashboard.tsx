import React, { useMemo } from 'react';
import { ArrowUpRight, Users, ClipboardCheck, Clock } from 'lucide-react';

// --- Types ---
interface SubmissionData {
  date: string;
  submissions: number;
  candidate: string;
  focus: string;
  status: 'Under review' | 'Interview' | 'Shortlisted' | 'Submitted';
}

// --- Mock Data ---
const SUBMISSION_DATA: SubmissionData[] = [
  { date: 'Dec 16', submissions: 18, candidate: 'Aarav S.', focus: 'Responsive storytelling', status: 'Under review' },
  { date: 'Dec 17', submissions: 22, candidate: 'Mira K.', focus: 'UI motion study', status: 'Under review' },
  { date: 'Dec 18', submissions: 27, candidate: 'Ishan G.', focus: 'Next.js deployment', status: 'Shortlisted' },
  { date: 'Dec 19', submissions: 24, candidate: 'Sara P.', focus: 'Content strategy', status: 'Interview' },
  { date: 'Dec 20', submissions: 31, candidate: 'Noor R.', focus: 'Accessibility audit', status: 'Shortlisted' },
  { date: 'Dec 21', submissions: 28, candidate: 'Kabir L.', focus: 'Design systems', status: 'Under review' },
  { date: 'Dec 22', submissions: 34, candidate: 'Tara V.', focus: 'Brand narrative', status: 'Shortlisted' },
  { date: 'Dec 23', submissions: 29, candidate: 'Dev K.', focus: 'Performance tuning', status: 'Interview' },
  { date: 'Dec 24', submissions: 26, candidate: 'Lina M.', focus: 'Service blueprint', status: 'Under review' },
  { date: 'Dec 25', submissions: 19, candidate: 'Harsh D.', focus: 'Visual identity', status: 'Submitted' },
];

// --- Sub-Components ---

const StatCard: React.FC<{
  label: string;
  value: string;
  subtext?: string;
  icon?: React.ReactNode;
}> = ({ label, value, subtext, icon }) => (
  <div className="bg-white p-6 rounded-sm shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-stone-100 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500 ease-out group">
    <div className="flex justify-between items-start mb-4">
      <p className="text-xs font-semibold tracking-widest text-stone-400 uppercase">{label}</p>
      <div className="text-stone-300 group-hover:text-stone-500 transition-colors duration-300">
        {icon}
      </div>
    </div>
    <h4 className="font-serif text-3xl text-stone-800 mb-1">{value}</h4>
    {subtext && <p className="text-xs text-stone-500">{subtext}</p>}
  </div>
);

const SimpleLineChart: React.FC<{ data: SubmissionData[] }> = ({ data }) => {
  const height = 200;
  const width = 600; // viewBox width
  const padding = 20;

  // Calculate scales
  const maxVal = Math.max(...data.map((d) => d.submissions));
  const minVal = 0;
  const range = maxVal - minVal || 1;

  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * (width - padding * 2) + padding;
      const y = height - ((d.submissions - minVal) / range) * (height - padding * 2) - padding;
      return `${x},${y}`;
    })
    .join(' ');

  // Create area path (for fill)
  const areaPoints = `
    ${padding},${height - padding} 
    ${points} 
    ${width - padding},${height - padding}
  `;

  return (
    <div className="w-full h-full min-h-[250px] flex items-center justify-center">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
        {/* Grid lines */}
        {[0.2, 0.4, 0.6, 0.8].map((p) => (
          <line
            key={p}
            x1={padding}
            y1={height - height * p}
            x2={width - padding}
            y2={height - height * p}
            stroke="#e7e5e4"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        ))}

        {/* Area Fill */}
        <path
          d={`M ${areaPoints} Z`}
          fill="rgba(168, 162, 158, 0.1)"
          className="opacity-0 animate-fade-in"
          style={{ animationDelay: '0.5s' }}
        />

        {/* Line */}
        <polyline
          fill="none"
          stroke="#78716c"
          strokeWidth="2"
          points={points}
          className="drop-shadow-sm opacity-0 animate-fade-in"
          style={{ animationDelay: '0.8s' }}
        />

        {/* Data Points */}
        {data.map((d, i) => {
          const x = (i / (data.length - 1)) * (width - padding * 2) + padding;
          const y = height - ((d.submissions - minVal) / range) * (height - padding * 2) - padding;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="3"
              className="fill-white stroke-stone-600 stroke-2 hover:r-5 hover:fill-stone-600 transition-all duration-300 cursor-pointer opacity-0 animate-fade-in"
              style={{ animationDelay: `${1 + i * 0.1}s` }}
            >
              <title>{`${d.submissions} submissions — ${d.date}`}</title>
            </circle>
          );
        })}
      </svg>
    </div>
  );
};

const SubmissionTable: React.FC<{ data: SubmissionData[] }> = ({ data }) => (
  <div className="overflow-hidden">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr>
          <th className="py-4 px-4 text-xs font-semibold tracking-wider text-stone-400 uppercase border-b border-stone-100">Date</th>
          <th className="py-4 px-4 text-xs font-semibold tracking-wider text-stone-400 uppercase border-b border-stone-100">Candidate</th>
          <th className="py-4 px-4 text-xs font-semibold tracking-wider text-stone-400 uppercase border-b border-stone-100">Focus</th>
          <th className="py-4 px-4 text-xs font-semibold tracking-wider text-stone-400 uppercase border-b border-stone-100 text-right">Status</th>
        </tr>
      </thead>
      <tbody>
        {data
          .slice()
          .reverse()
          .slice(0, 5)
          .map((row, i) => (
            <tr key={i} className="group hover:bg-stone-50 transition-colors duration-200">
              <td className="py-4 px-4 text-sm text-stone-600 border-b border-stone-50 group-hover:border-stone-100">{row.date}</td>
              <td className="py-4 px-4 text-sm text-stone-800 font-medium border-b border-stone-50 group-hover:border-stone-100">{row.candidate}</td>
              <td className="py-4 px-4 text-sm text-stone-600 border-b border-stone-50 group-hover:border-stone-100">{row.focus}</td>
              <td className="py-4 px-4 text-sm border-b border-stone-50 group-hover:border-stone-100 text-right">
                <span className="inline-flex items-center px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded-full bg-stone-100 text-stone-600">
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
);

// --- Main Dashboard Component ---

export const Dashboard: React.FC = () => {
  const stats = useMemo(() => {
    const total = SUBMISSION_DATA.reduce((acc, curr) => acc + curr.submissions, 0);
    const shortlist = Math.round(total * 0.35);
    const capacity = 180;
    const spotsLeft = Math.max(capacity - total, 0);
    const averagePerDay = Math.round(total / SUBMISSION_DATA.length);
    const reviewTurnaround = '18 hrs';

    return { total, shortlist, spotsLeft, averagePerDay, reviewTurnaround };
  }, []);

  return (
    <section className="py-24 bg-stone-50/50">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold tracking-widest text-stone-400 uppercase mb-2 block">Selection Insights</span>
            <h3 className="font-serif text-3xl md:text-4xl text-stone-800">Internship Dashboard</h3>
            <p className="text-sm text-stone-500 mt-2 max-w-md">
              A quick pulse on how the Sammunat Creative Internship submissions are landing each day. Use it to pace your own delivery.
            </p>
          </div>
          <div className="flex items-center gap-2 text-stone-500 text-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500/50 animate-pulse"></span>
            Live updates
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            label="Submissions to Date"
            value={`${stats.total}`}
            subtext="Across all specialisations"
            icon={<Users size={18} strokeWidth={1.5} />}
          />
          <StatCard
            label="Shortlist Invitations"
            value={`${stats.shortlist}`}
            subtext="Rolling reviews daily"
            icon={<ClipboardCheck size={18} strokeWidth={1.5} />}
          />
          <StatCard
            label="Avg. Submissions / Day"
            value={`${stats.averagePerDay}`}
            subtext="Past 10-day window"
            icon={<ArrowUpRight size={18} strokeWidth={1.5} />}
          />
          <StatCard
            label="Review Turnaround"
            value={stats.reviewTurnaround}
            subtext="Goal: under 24 hours"
            icon={<Clock size={18} strokeWidth={1.5} />}
          />
        </div>

        {/* Visualization Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart Section */}
          <div className="lg:col-span-2 bg-white p-8 rounded-sm shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-stone-100">
            <div className="mb-6">
              <h4 className="font-serif text-xl text-stone-800">Submission Momentum</h4>
              <p className="text-sm text-stone-400 mt-1">Daily intake over the last 10 days</p>
            </div>
            <SimpleLineChart data={SUBMISSION_DATA} />
          </div>

          {/* Table Section */}
          <div className="lg:col-span-1 bg-white p-8 rounded-sm shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-stone-100 flex flex-col">
            <div className="mb-6">
              <h4 className="font-serif text-xl text-stone-800">Recent Standouts</h4>
              <p className="text-sm text-stone-400 mt-1">Projects catching the review team’s eye</p>
            </div>
            <SubmissionTable data={SUBMISSION_DATA} />
            <div className="mt-auto pt-4 text-center">
              <button className="text-xs font-semibold tracking-widest text-stone-400 hover:text-stone-600 transition-colors uppercase">
                View submission guide
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
