// Компонент для выбора уровня сложности: Junior, Middle, Senior
export const DifficultySelector = ({ formData, setFormData, error }) => {
  return (
    <div>
      <div className="flex gap-5 justify-around p-4">
        <label className="relative flex items-center cursor-pointer">
          <input
            checked={formData.difficulty === "Junior"}
            className="sr-only peer"
            name="futuristic-radio"
            type="radio"
            value="Junior"
            onChange={(e) =>
              setFormData({ ...formData, difficulty: e.target.value })
            }
          />
          <div className="w-6 h-6 bg-transparent border-2 border-green-400 rounded-full peer-checked:bg-green-400 peer-checked:border-green-400 peer-hover:shadow-lg peer-hover:shadow-green-500/50 peer-checked:shadow-lg peer-checked:shadow-green-500/50 transition duration-300 ease-in-out"></div>
          <span className="ml-2 text-gray-900">Junior</span>
        </label>
        <label className="relative flex items-center cursor-pointer">
          <input
            checked={formData.difficulty === "Middle"}
            className="sr-only peer"
            name="futuristic-radio"
            type="radio"
            value="Middle"
            onChange={(e) =>
              setFormData({ ...formData, difficulty: e.target.value })
            }
          />
          <div className="w-6 h-6 bg-transparent border-2 border-yellow-400 rounded-full peer-checked:bg-yellow-400 peer-checked:border-yellow-400 peer-hover:shadow-lg peer-hover:shadow-yellow-500/50 peer-checked:shadow-lg peer-checked:shadow-yellow-500/50 transition duration-300 ease-in-out"></div>
          <span className="ml-2 text-gray-900">Middle</span>
        </label>
        <label className="relative flex items-center cursor-pointer">
          <input
            checked={formData.difficulty === "Senior"}
            className="sr-only peer"
            name="futuristic-radio"
            type="radio"
            value="Senior"
            onChange={(e) =>
              setFormData({ ...formData, difficulty: e.target.value })
            }
          />
          <div className="w-6 h-6 bg-transparent border-2 border-red-400 rounded-full peer-checked:bg-red-400 peer-checked:border-red-400 peer-hover:shadow-lg peer-hover:shadow-red-500/50 peer-checked:shadow-lg peer-checked:shadow-red-500/50 transition duration-300 ease-in-out"></div>
          <span className="ml-2 text-gray-900">Senior</span>
        </label>
      </div>
      {error && <p className="text-red-600 font-bold text-sm mt-2">{error}</p>}
    </div>
  );
};
