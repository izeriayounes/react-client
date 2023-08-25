function Input({ className, label, id, type, register, ...rest }) {
  const maxDate = type === 'date' ? new Date().toISOString().split('T')[0] : null;
  return (
    <div className={'mb-4 ' + className}>
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 " htmlFor={id}>
        {label}
      </label>
      <input
        className="appearance-none block w-full bg-white text-gray-700 border border-purple-500 rounded py-3 px-4"
        name={id}
        id={id}
        {...(register !== null && { ...register(id) })}
        max={maxDate}
        type={type}
        {...rest}
      />
    </div>
  );
}

export default Input;
