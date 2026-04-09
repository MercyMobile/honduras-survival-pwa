export default function LanguageTools() {
  return (
    <div className="p-4 h-full flex flex-col items-center justify-center text-center space-y-4">
      <div className="w-20 h-20 bg-stone-800 rounded-full flex items-center justify-center border border-stone-700 mb-4 shadow-lg">
        <span className="text-3xl text-stone-500">A</span>
        <span className="text-lg text-stone-600 mx-2">/</span>
        <span className="text-3xl text-lime-600">あ</span>
      </div>
      <h2 className="text-xl font-bold text-stone-300">Language Module Offline</h2>
      <p className="text-sm text-stone-500 max-w-xs leading-relaxed">
        The English-Spanish and English-Miskito translation module is scheduled for a future deployment phase.
      </p>
      <div className="px-4 py-2 bg-stone-950 border border-stone-800 shadow-inner rounded text-[10px] font-mono text-stone-400 tracking-widest mt-8">
        STATUS: PENDING IMPLEMENTATION
      </div>
    </div>
  );
}