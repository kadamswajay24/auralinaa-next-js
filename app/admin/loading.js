export default function AdminLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] w-full">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-4 border-coral/20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-coral border-t-transparent animate-spin"></div>
        </div>
        <p className="text-sm font-semibold text-slate-500 tracking-wide animate-pulse">
          Loading Admin Panel...
        </p>
      </div>
    </div>
  );
}
