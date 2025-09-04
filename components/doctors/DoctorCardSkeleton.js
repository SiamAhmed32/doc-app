export default function DoctorCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="h-48 w-full animate-pulse bg-slate-200 dark:bg-slate-700"></div>
      <div className="flex flex-1 flex-col p-4">
        <div className="h-6 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-700"></div>
        <div className="mt-2 h-4 w-1/2 animate-pulse rounded bg-slate-200 dark:bg-slate-700"></div>
        <div className="mt-auto pt-4">
          <div className="h-10 w-full animate-pulse rounded-md bg-slate-200 dark:bg-slate-700"></div>
        </div>
      </div>
    </div>
  );
}