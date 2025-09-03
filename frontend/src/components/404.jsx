export const NotFoundPage = () => {
  return (
    <div className="w-full h-[calc(100vh-12rem)] flex flex-col items-center justify-center">
      <p className="text-[150px] sm:text-[300px] font-bold text-[var(--faded-text-color)]">
        404
      </p>
      <p className="text-xl text-gray-500">Сторінку не знайдено</p>
    </div>
  );
};
