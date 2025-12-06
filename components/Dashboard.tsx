import React, { useMemo, useState } from 'react';
import { ArrowUpRight, Users, DollarSign, Activity } from 'lucide-react';

// --- Types ---
interface DonationData {
  date: string;
  amount: number;
  donor: string;
}

// --- Mock Data ---
const MOCK_DATA: DonationData[] = [
  { date: 'Oct 12', amount: 450, donor: 'Anonymous' },
  { date: 'Oct 13', amount: 120, donor: 'Sarah M.' },
  { date: 'Oct 14', amount: 890, donor: 'Family Trust' },
  { date: 'Oct 15', amount: 200, donor: 'J. Doe' },
  { date: 'Oct 16', amount: 1200, donor: 'Anonymous' },
  { date: 'Oct 17', amount: 560, donor: 'Michael B.' },
  { date: 'Oct 18', amount: 340, donor: 'Alice W.' },
  { date: 'Oct 19', amount: 900, donor: 'Community Fund' },
  { date: 'Oct 20', amount: 150, donor: 'Anonymous' },
  { date: 'Oct 21', amount: 780, donor: 'R. Smith' },
];

// --- Sub-Components ---

const StatCard: React.FC<{ 
  label: string; 
  value: string; 
  subtext?: string; 
  icon?: React.ReactNode 
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

const SimpleLineChart: React.FC<{ data: DonationData[] }> = ({ data }) => {
  const height = 200;
  const width = 600; // viewBox width
  const padding = 20;

  // Calculate scales
  const maxVal = Math.max(...data.map(d => d.amount));
  const minVal = 0;
  
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * (width - padding * 2) + padding;
    const y = height - ((d.amount - minVal) / (maxVal - minVal)) * (height - padding * 2) - padding;
    return `${x},${y}`;
  }).join(' ');

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
        {[0.2, 0.4, 0.6, 0.8].map(p => (
          <line 
            key={p} 
            x1={padding} 
            y1={height - (height * p)} 
            x2={width - padding} 
            y2={height - (height * p)} 
            stroke="#e7e5e4" 
            strokeWidth="1" 
            strokeDasharray="4 4"
          />
        ))}
        
        {/* Area Fill */}
        <path 
          d={`M ${areaPoints} Z`} 
          fill="rgba(168, 162, 158, 0.1)" // stone-400 with opacity
          className="opacity-0 animate-fade-in"
          style={{ animationDelay: '0.5s' }}
        />
        
        {/* Line */}
        <polyline 
          fill="none" 
          stroke="#78716c" // stone-500
          strokeWidth="2" 
          points={points} 
          className="drop-shadow-sm opacity-0 animate-fade-in"
          style={{ animationDelay: '0.8s' }}
        />

        {/* Data Points */}
        {data.map((d, i) => {
           const x = (i / (data.length - 1)) * (width - padding * 2) + padding;
           const y = height - ((d.amount - minVal) / (maxVal - minVal)) * (height - padding * 2) - padding;
           return (
             <circle 
               key={i}
               cx={x} 
               cy={y} 
               r="3" 
               className="fill-white stroke-stone-600 stroke-2 hover:r-5 hover:fill-stone-600 transition-all duration-300 cursor-pointer opacity-0 animate-fade-in"
               style={{ animationDelay: `${1 + i * 0.1}s` }}
             >
               <title>${d.amount} - {d.date}</title>
             </circle>
           );
        })}
      </svg>
    </div>
  );
};

const DonationTable: React.FC<{ data: DonationData[] }> = ({ data }) => (
  <div className="overflow-hidden">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr>
          <th className="py-4 px-4 text-xs font-semibold tracking-wider text-stone-400 uppercase border-b border-stone-100">Date</th>
          <th className="py-4 px-4 text-xs font-semibold tracking-wider text-stone-400 uppercase border-b border-stone-100">Donor</th>
          <th className="py-4 px-4 text-xs font-semibold tracking-wider text-stone-400 uppercase border-b border-stone-100 text-right">Amount</th>
        </tr>
      </thead>
      <tbody>
        {data.slice().reverse().slice(0, 5).map((row, i) => (
          <tr key={i} className="group hover:bg-stone-50 transition-colors duration-200">
            <td className="py-4 px-4 text-sm text-stone-600 border-b border-stone-50 group-hover:border-stone-100">{row.date}</td>
            <td className="py-4 px-4 text-sm text-stone-800 font-medium border-b border-stone-50 group-hover:border-stone-100">{row.donor}</td>
            <td className="py-4 px-4 text-sm text-stone-600 border-b border-stone-50 group-hover:border-stone-100 text-right font-mono">
              ${row.amount.toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// --- Main Dashboard Component ---

export const Dashboard: React.FC = () => {
  // Memoize simple stats calculation
  const stats = useMemo(() => {
    const total = MOCK_DATA.reduce((acc, curr) => acc + curr.amount, 0);
    const avg = Math.round(total / MOCK_DATA.length);
    const donors = 842; // Hardcoded 'total' for realism vs mock array slice
    return { total, avg, donors };
  }, []);

  return (
    <section className="py-24 bg-stone-50/50">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold tracking-widest text-stone-400 uppercase mb-2 block">Transparency</span>
            <h3 className="font-serif text-3xl md:text-4xl text-stone-800">Donation Dashboard</h3>
          </div>
          <div className="flex items-center gap-2 text-stone-500 text-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500/50 animate-pulse"></span>
            Live Updates
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard 
            label="Total Raised" 
            value={`$${(124500 + stats.total).toLocaleString()}`} 
            subtext="+12% from last month"
            icon={<DollarSign size={18} strokeWidth={1.5} />}
          />
          <StatCard 
            label="Total Donors" 
            value={stats.donors.toString()} 
            subtext="Across 14 countries"
            icon={<Users size={18} strokeWidth={1.5} />}
          />
          <StatCard 
            label="Avg. Donation" 
            value={`$${stats.avg}`} 
            subtext="Most common: $50"
            icon={<Activity size={18} strokeWidth={1.5} />}
          />
          <StatCard 
            label="This Week" 
            value={`$${stats.total.toLocaleString()}`} 
            subtext="Since Monday"
            icon={<ArrowUpRight size={18} strokeWidth={1.5} />}
          />
        </div>

        {/* Visualization Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Chart Section */}
          <div className="lg:col-span-2 bg-white p-8 rounded-sm shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-stone-100">
             <div className="mb-6">
                <h4 className="font-serif text-xl text-stone-800">Donation Trends</h4>
                <p className="text-sm text-stone-400 mt-1">Daily overview for October</p>
             </div>
             <SimpleLineChart data={MOCK_DATA} />
          </div>

          {/* Table Section */}
          <div className="lg:col-span-1 bg-white p-8 rounded-sm shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-stone-100 flex flex-col">
            <div className="mb-6">
               <h4 className="font-serif text-xl text-stone-800">Recent Support</h4>
               <p className="text-sm text-stone-400 mt-1">Thank you to our community</p>
            </div>
            <DonationTable data={MOCK_DATA} />
            <div className="mt-auto pt-4 text-center">
              <button className="text-xs font-semibold tracking-widest text-stone-400 hover:text-stone-600 transition-colors uppercase">
                View All Transactions
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};