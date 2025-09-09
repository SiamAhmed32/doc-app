"use client";

export default function DoctorCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 animate-pulse">
      <div className="h-36 w-full sm:h-48 bg-slate-200 dark:bg-slate-700"></div>
      <div className="flex flex-1 flex-col p-4 gap-2">
        <div className="h-6 w-3/4 rounded bg-slate-200 dark:bg-slate-700"></div>
        <div className="h-4 w-1/2 rounded bg-slate-200 dark:bg-slate-700"></div>
        <div className="mt-auto pt-4 flex gap-2">
          <div className="h-10 w-1/2 rounded-md bg-slate-200 dark:bg-slate-700"></div>
          <div className="h-10 w-1/2 rounded-md bg-slate-200 dark:bg-slate-700"></div>
        </div>
      </div>
    </div>
  );
}
