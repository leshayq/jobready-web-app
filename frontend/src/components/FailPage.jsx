import FailIcon from "../assets/fail_icon.png";

export const FailPage = ({ title, description }) => {
  return (
    <div className="mx-auto p-6 flex items-center justify-center flex-col mt-10 max-w-3xl shadow-lg rounded-3xl text-center bg-gray-100">
      <div>
        <img src={FailIcon} alt="success" height="150" width="150" />
      </div>
      <h2 className="font-bold text-4xl !mt-6">{title}</h2>
      <p className="max-w-xl text-center mt-4 mb-8 text-[var(--faded-text-color)]">
        {description}
      </p>
      <Button
        title="Головна сторінка"
        onClickEvent={() => navigate("/", { replace: true })}
      />
    </div>
  );
};
