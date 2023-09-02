function ImgUpload({ onChange }) {
  const handleChange = (e) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const encodedData = event.target.result.split(',')[1];
      onChange(encodedData);
    };

    reader.readAsDataURL(e.target.files[0]);
  };
  return (
    <div className="mb-4">
      <label htmlFor="image" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        Telecharger une image
      </label>
      <input
        type="file"
        id="image"
        name="image"
        accept="image/*"
        className="py-2 px-4 border border-purple-500 rounded bg-white"
        onChange={handleChange}
      />
    </div>
  );
}

export default ImgUpload;
