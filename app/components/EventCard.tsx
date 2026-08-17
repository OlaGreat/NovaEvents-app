import Link from "next/link";
import { formatEventDate, calculateFundingProgress } from "../lib/eventFormatting";

interface EventCardProps {
  id: number;
  name: string;
  venue: string;
  dateUnix: number;
  fundingGoal: string;
  balance: string;
  tierCount: number;
  status: "Active" | "Ended" | "Cancelled";
}

const statusStyles = {
  Active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Ended: "bg-slate-500/10 text-slate-400 border-slate-500/20",
  Cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
};

function formatUsdc(stroops: string): string {
  return `${(Number(stroops) / 10_000_000).toLocaleString()} USDC`;
}

export default function EventCard({
  id,
  name,
  venue,
  dateUnix,
  fundingGoal,
  balance,
  tierCount,
  status,
}: EventCardProps) {
  const date = formatEventDate(dateUnix);
  const progress = calculateFundingProgress(balance, fundingGoal);

  return (
    <Link href={`/events/${id}`}>
      <div className="bg-slate-900 border border-white/10 hover:border-violet-500/40 rounded-xl p-6 transition-colors cursor-pointer h-full flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-lg leading-tight">{name}</h3>
          <span
            className={`shrink-0 text-xs border px-2 py-0.5 rounded-full ${statusStyles[status]}`}
          >
            {status}
          </span>
        </div>

        <div className="text-sm text-slate-400 flex flex-col gap-1">
          <span>{venue}</span>
          <span>{date}</span>
          <span>{tierCount} tier{tierCount !== 1 ? "s" : ""}</span>
        </div>

        <div className="mt-auto">
          <div className="flex justify-between text-xs text-slate-500 mb-1.5">
            <span>{formatUsdc(balance)} raised</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-violet-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Goal: {formatUsdc(fundingGoal)}
          </p>
        </div>
      </div>
    </Link>
  );
}
