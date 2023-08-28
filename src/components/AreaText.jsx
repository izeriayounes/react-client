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
        className="appearance-none block w-full bg-[#f8f8f8] text-gray-700 border border-purple-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
        id={id}
        {...register(id)}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
}

export default AreaText;
