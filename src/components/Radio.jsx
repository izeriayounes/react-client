function Radio({ register }) {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };
  return (
    <div className="mb-4 flex">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-10">Sexe</label>
      <div className="flex-1">
        <input
          type="radio"
          id="male"
          name="sexe"
          value="masculin"
          className="mr-1"
          {...register('sexe', { required: true })}
          onKeyDown={handleKeyPress}
        />
        <label htmlFor="male" className="mr-4 text-sm">
          Masculin
        </label>

        <input
          type="radio"
          id="feminine"
          name="sexe"
          value="feminin"
          className="mr-1"
          {...register('sexe', { required: true })}
          onKeyDown={handleKeyPress}
        />
        <label htmlFor="feminine" className="text-sm">
          Feminin
        </label>
      </div>
    </div>
  );
}

export default Radio;
