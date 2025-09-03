export const HomeInfoElement = ({ title, desc, icon }) => {
  return (
    <div className="flex flex-col justify-center items-center max-w-76">
      <img src={icon} className="w-20 h-20 mb-2 text-center" />
      <h3 className="text-2xl font-medium text-gray-900 text-center !mb-1">
        {title}
      </h3>
      <p className="text-[var(--faded-text-color)] text-center break-words text-sm">
        {desc}
      </p>
    </div>
  );
};
