export const FormField = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  error,
  isRequired,
}) => {
  return (
    <div className="mb-4">
      <input
        name={name}
        type={type}
        className={`bg-gray-100 w-full text-gray-900 rounded-md p-4 transition ease-in-out duration-150
    focus:bg-gray-200 focus:outline-none
    ${
      error
        ? "ring-1 ring-red-600 border-red-600"
        : "focus:ring-1 focus:ring-[var(--primary-color)]"
    }`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={isRequired}
      />
      {error && <p className="text-red-600 font-bold text-sm mt-2">{error}</p>}
    </div>
  );
};
