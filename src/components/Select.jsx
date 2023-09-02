function Select({ register, list, id, label }) {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };
  return (
    <div className="mb-4">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        className="border border-purple-500 rounded bg-white w-full text-gray-700 py-3 px-4 leading-tight"
        {...register(id)}
        onKeyDown={handleKeyPress}
      >
        <option>Selectionner... </option>
        {list.map((level, index) => (
          <option key={index}>{level}</option>
        ))}
      </select>
    </div>
  );
}

export default Select;
