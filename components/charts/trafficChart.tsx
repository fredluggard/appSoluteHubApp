// SmoothAreaChart.tsx
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface DashboardData {
  metrics: {
    pageviews: number;
    monthlyUsers: number;
    posts: number;
    totalTasks: number;
  };
  siteTraffic: {
    total: number;
    monthlyData: {
      month: string;
      value: number;
      fullDate: string;
    }[];
  };
  topArticles: {
    title: string;
    postDate: string;
    category: string | null;
    commentsCount: number;
    imageUrl: string;
  }[];
  deviceUsage: any;
}

const data = [
  { date: "Jan", value: 0, fullDate: "Jan 2023" },
  { date: "Feb", value: 5000, fullDate: "Feb 2023" },
  { date: "Mar", value: 35000, fullDate: "Mar 2023" },
  { date: "Apr", value: 85000, fullDate: "Apr 2023" },
  { date: "May", value: 115000, fullDate: "May 2023" },
  { date: "Jun", value: 125200, fullDate: "Jun 2023" },
  { date: "Jul", value: 125000, fullDate: "Jul 2023" },
  { date: "Aug", value: 140000, fullDate: "Aug 2023" },
  { date: "Sep", value: 160000, fullDate: "Sep 2023" },
  { date: "Oct", value: 180000, fullDate: "Oct 2023" },
  { date: "Nov", value: 200000, fullDate: "Nov 2023" },
  { date: "Dec", value: 210000, fullDate: "Dec 2023" },
];

const formatNumber = (num: number) => `${(num / 1000).toFixed(1)}K`;

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg bg-white p-2 shadow-lg border border-gray-200">
        <p className="text-sm font-semibold text-black">
          {formatNumber(payload[0].value)}
        </p>
        <p className="text-xs text-gray-500">{payload[0].payload.fullDate}</p>
      </div>
    );
  }
  return null;
};

export default function TrafficChart({
  dashData,
}: {
  dashData: DashboardData | null;
}) {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer>
        <AreaChart data={dashData?.siteTraffic.monthlyData || data}>
          <defs>
            <linearGradient id="colorFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" />
          <YAxis tickFormatter={formatNumber} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={2}
            fill="url(#colorFill)"
            activeDot={{ r: 6, stroke: "#fff", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
