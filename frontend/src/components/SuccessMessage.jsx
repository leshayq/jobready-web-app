export const SuccessMessage = ({ message, isVisible }) => {
  return (
    <div
      role="alert"
      className={`${
        isVisible ? "flex" : "hidden"
      } fixed bottom-5 right-5 z-50 bg-green-100 dark:bg-green-900 border-l-4 border-green-500 dark:border-green-700 text-green-900 dark:text-green-100 p-4 rounded-lg items-center transition-opacity duration-300 ease-in-out hover:bg-green-200 dark:hover:bg-green-800`}
    >
      <svg
        stroke="currentColor"
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5 flex-shrink-0 mr-3 text-green-600"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p className="text-md font-semibold">{message}</p>{" "}
    </div>
  );
};
