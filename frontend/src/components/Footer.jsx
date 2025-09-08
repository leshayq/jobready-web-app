import whiteLogo from "../assets/white_logo.png";
import { NavButton } from "./buttons/NavButton";

// Футер сайта, отображается внизу каждой страницы
export const Footer = () => {
  return (
    <div className="bg-[var(--primary-color)] p-15 flex flex-col justify-center items-center text-center xl:block xl:text-left">
      <div className="max-h-36 max-w-36 overflow-hidden mb-6">
        <img
          className="max-h-full max-w-full block object-contain"
          src={whiteLogo}
        ></img>
      </div>

      <div className="flex flex-col xl:flex-row xl:justify-between">
        <ul className="flex flex-col xl:flex-row gap-6 xl:gap-12 list-none mb-6 xl:mb-0">
          <NavButton title="Питання" link="questions" type="footer"></NavButton>
          <NavButton
            title="Співбесіди"
            link="interviews"
            type="footer"
          ></NavButton>
          <NavButton
            title="Stack Overflow"
            link="stackoverflow"
            type="footer"
          ></NavButton>
          <NavButton title="Про нас" link="about" type="footer"></NavButton>
        </ul>

        <ul className="flex flex-col xl:flex-row gap-6 xl:gap-12 list-none">
          <NavButton
            title="Користувацька угода"
            link="questions"
            type="footer"
          ></NavButton>
          <NavButton
            title="Повідомлення про обробку персональних даних"
            link="interviews"
            type="footer"
          ></NavButton>
        </ul>
      </div>

      <div className="mt-5">
        <p className="text-[var(--faded-text-color)]">© 2025 Jobready</p>
      </div>
    </div>
  );
};
