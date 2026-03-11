const Input = ({ label, error, className = '', ...props }) => {
  return (
    <div className="flex flex-col mb-4">
      {label && <label className="text-slate-700 font-bold uppercase tracking-widest text-[10px] mb-2">{label}</label>}
      <input 
        className={`bg-slate-900 text-white border-2 border-slate-100 px-6 py-4 rounded-3xl outline-none focus:border-primary transition-all text-sm placeholder:text-slate-400 ${error ? 'border-red-500 bg-red-50' : ''} ${className}`} 
        {...props} 
      />
      {error && <span className="text-red-500 text-[10px] mt-2 font-medium tracking-wide">{error}</span>}
    </div>
  );
};

export default Input;
