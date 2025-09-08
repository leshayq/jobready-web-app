// Сообщение об ошибке, появляется внизу справа и исчезает через некоторое время
export const ErrorMessage = ({ message, isVisible }) => {
  return (
    <div
      role="alert"
      className={`${
        isVisible ? "flex" : "hidden"
      } fixed bottom-5 right-5 z-50 bg-red-100 dark:bg-red-900 border-l-4 border-red-500 dark:border-red-700 text-red-900 dark:text-red-100 p-4 rounded-lg items-center transition-opacity duration-300 ease-in-out hover:bg-red-200 dark:hover:bg-red-800`}
    >
      <svg
        stroke="currentColor"
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5 flex-shrink-0 mr-3 text-red-600"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
      <p className="text-md font-semibold">{message}</p>
    </div>
  );
};
