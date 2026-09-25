export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/80 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 rounded-full border-4 border-white/20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-coral border-t-transparent animate-spin"></div>
        </div>
        <p className="text-sm font-semibold text-white tracking-widest uppercase animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
