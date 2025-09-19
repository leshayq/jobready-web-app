import { useSearchParams } from "react-router-dom";
import { verificateEmail } from "../../api/email-verification/email-verification";
import { useEffect, useState } from "react";
import SuccessIcon from "../../assets/success_icon.png";
import FailIcon from "../../assets/fail_icon.png";
import { Button } from "../../components/buttons/Button";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/Loader";

export const EmailConfirmed = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  useEffect(() => {
    if (isAuthenticated) {
      return navigate("/", { replace: true });
    }
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      try {
        await verificateEmail(token);
        setSuccess(true);
      } catch (error) {
        setSuccess(false);
        console.error(
          "Помилка при спробі підтвердження електронної пошти",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (success) {
    return (
      <div className="mx-auto p-6 flex items-center justify-center flex-col mt-10 max-w-3xl shadow-lg rounded-3xl text-center bg-gray-100">
        <div>
          <img src={SuccessIcon} alt="success" height="150" width="150" />
        </div>
        <h2 className="font-bold text-4xl !mt-6">
          Електронну пошту підтверджено
        </h2>
        <p className="max-w-xl text-center mt-4 mb-8 text-[var(--faded-text-color)]">
          Ви успішно підтвердили свій обліковий запис
        </p>
        <Button
          title="Головна сторінка"
          onClickEvent={() => navigate("/", { replace: true })}
        />
      </div>
    );
  } else {
    return (
      <div className="mx-auto p-6 flex items-center justify-center flex-col mt-10 max-w-3xl shadow-lg rounded-3xl text-center bg-gray-100">
        <div>
          <img src={FailIcon} alt="success" height="150" width="150" />
        </div>
        <h2 className="font-bold text-4xl !mt-6">Помилка</h2>
        <p className="max-w-xl text-center mt-4 mb-8 text-[var(--faded-text-color)]">
          Під час підтвердження електронної пошти виникла помилка
        </p>
        <Button
          title="Головна сторінка"
          onClickEvent={() => navigate("/", { replace: true })}
        />
      </div>
    );
  }
};
