import JobReadyLogo from "../../assets/logo.png";
import { Button } from "../../components/buttons/Button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

export const EmailSent = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      return navigate("/", { replace: true });
    }
  }, []);

  return (
    <div className="mx-auto p-6 flex items-center justify-center flex-col mt-10 max-w-3xl shadow-lg rounded-3xl text-center bg-gray-100">
      <div>
        <img src={JobReadyLogo} height="150" width="150" />
      </div>
      <h2 className="font-bold text-4xl !mt-6">
        Підтвердження електронної пошти
      </h2>
      <p className="max-w-140 text-center mt-4 mb-8 text-[var(--faded-text-color)]">
        Ми надіслали листа на вашу електронну пошту для підтвердження її
        дійсності. Після отримання листа перейдіть за наданим посиланням, щоб
        завершити процес реєстрації.
      </p>
      <Button
        title="Головна сторінка"
        onClickEvent={() => navigate("/", { replace: true })}
      ></Button>
    </div>
  );
};
