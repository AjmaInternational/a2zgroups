import { Link } from 'react-router-dom';

const Button = ({ children, className = '', variant = 'primary', size = 'md', to, ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold uppercase tracking-widest transition-all rounded-full hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-opacity-90',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
    dark: 'bg-slate-900 text-white hover:bg-slate-800',
    light: 'bg-white text-slate-900 hover:bg-slate-100',
  };

  const sizes = {
    sm: 'px-4 py-2 text-[10px]',
    md: 'px-6 py-3 text-xs',
    lg: 'px-10 py-4 text-sm',
    xl: 'px-12 py-5 text-base',
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClassName} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button 
      className={combinedClassName}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
