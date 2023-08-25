function Select({ register, list, id, label }) {
  return (
    <div className="mb-4">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        className="appearance-none block w-full bg-[#f8f8f8] text-gray-700 border border-purple-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
        {...register(id)}
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
