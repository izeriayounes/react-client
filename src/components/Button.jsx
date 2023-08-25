import classNames from 'classnames';

function Button({ children, classes, primary, outline, ...rest }) {
  const className = classNames(
    'hover:opacity-100 px-3 py-1.5 rounded border mb-4',
    primary && 'bg-purple-500 text-white',
    outline && 'border-purple-500 bg-slate-50 border-2 text-purple-600 font-semibold hover:bg-purple-100',
    classes
  );
  return (
    <button className={className} type="submit" {...rest}>
      {children}
    </button>
  );
}

export default Button;
