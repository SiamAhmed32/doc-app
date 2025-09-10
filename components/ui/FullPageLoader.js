"use client";


export default function FullPageLoader() {
  return (
    <div className="flex h-[calc(100vh-72px)] w-full items-center justify-center bg-white dark:bg-slate-900">
      <div
        className="h-3 w-12 animate-worm rounded-full bg-sky-600 bg-no-repeat dark:bg-sky-400"
        style={{
          backgroundImage:
            "radial-gradient(circle 3px, #ffffff 100%, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      ></div>
    </div>
  );
}