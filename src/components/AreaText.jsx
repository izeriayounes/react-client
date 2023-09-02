function AreaText({ label, id, register }) {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };
  return (
    <div className={'mb-4 '}>
      <label className={'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 '} htmlFor={id}>
        {label}
      </label>
      <textarea
        className="w-full text-gray-700 border border-purple-500 rounded py-3 px-4 leading-tight bg-white"
        id={id}
        {...register(id)}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
}

export default AreaText;
