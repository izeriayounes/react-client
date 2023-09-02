import classNames from 'classnames';

function Input({ className, label, id, type, register, onKeyDown, ...rest }) {
  const maxDate = type === 'date' ? new Date().toISOString().split('T')[0] : null;
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };
  return (
    <div className={classNames('mb-4', className)}>
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 " htmlFor={id}>
        {label}
      </label>
      <input
        className="appearance-none block w-full bg-white text-gray-700 border border-purple-500 rounded py-3 px-4"
        name={id}
        id={id}
        {...(register !== null && { ...register(id) })}
        max={type === 'date' ? maxDate : undefined}
        min={type === 'number' ? 0 : undefined}
        type={type}
        onKeyDown={onKeyDown !== null ? handleKeyPress : undefined}
        {...rest}
      />
    </div>
  );
}

export default Input;
