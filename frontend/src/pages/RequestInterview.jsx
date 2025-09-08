import { ReturnButton } from "../components/buttons/ReturnButton";
import { RequestInterviewForm } from "../forms/RequestInterviewForm";

export const RequestInterview = () => {
  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-lg">
      <div className="flex justify-end">
        <ReturnButton link="/interviews"></ReturnButton>
      </div>

      <h2 className="text-3xl font-semibold !mb-6 text-[var(--primary-color)] text-center">
        Запит співбесіди
      </h2>

      <RequestInterviewForm></RequestInterviewForm>
    </div>
  );
};
