import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import burgerMenu from "../assets/burgermenu.svg";
import { Button } from "./Button";
import { OutlineButton } from "./OutlineButton";
import { useState } from "react";
import { Modal } from "../components/Modal";
import { NavButton } from "./NavButton";
import { LoginForm } from "../forms/LoginForm";
import { RegisterForm } from "../forms/RegisterForm";
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(null);
  const { isAuthenticated, user } = useAuth();

  return (
    <nav className="flex items-center p-3 shadow-md mb-2.5 sticky top-0 z-50 bg-[#f4f4f4]">
      <Link to="/">
        <div className="max-h-36 max-w-36 overflow-hidden">
          <img
            className="max-h-full max-w-full block object-contain"
            src={logo}
          ></img>
        </div>
      </Link>

      <div className="w-full">
        <div className="flex cursor-pointer h-7 w-7 ml-auto lg:hidden">
          <img className="h-7 w-7" src={burgerMenu} alt="Menu" />
        </div>
        <ul className="hidden gap-12 ml-12 list-none lg:flex">
          <NavButton title="Питання" link="questions"></NavButton>
          <NavButton title="Співбесіди" link="interviews"></NavButton>
          <NavButton title="Stack Overflow" link="stackoverflow"></NavButton>
          <NavButton title="Про нас" link="about"></NavButton>
        </ul>
      </div>

      {isAuthenticated ? (
        <div className="flex w-fit shadow-box-up rounded-2xl dark:bg-box-dark dark:shadow-box-dark-out hover:bg-gray-200 transition-colors duration-200 ease-in-out ml-auto cursor-pointer">
          <div className="dark:shadow-buttons-box-dark rounded-2xl w-full">
            <Link
              to={"/profile"}
              className="text-light-blue-light hover:text-black dark:text-gray-400 border-2 inline-flex items-center mr-4 last-of-type:mr-0 p-2.5 border-transparent bg-light-secondary shadow-button-flat-nopressed hover:border-2 hover:shadow-button-flat-pressed focus:opacity-100 focus:outline-none active:border-2 active:shadow-button-flat-pressed font-medium rounded-full text-sm text-center dark:bg-button-curved-default-dark dark:shadow-button-curved-default-dark dark:hover:bg-button-curved-pressed-dark dark:hover:shadow-button-curved-pressed-dark dark:active:bg-button-curved-pressed-dark dark:active:shadow-button-curved-pressed-dark dark:focus:bg-button-curved-pressed-dark dark:focus:shadow-button-curved-pressed-dark dark:border-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
          </div>
        </div>
      ) : (
        <div className="hidden gap-5 ml-auto lg:flex">
          <OutlineButton
            title="Вхід"
            onClickEvent={() => setIsModalOpen("Вхід")}
          ></OutlineButton>
          <Button
            title="Реєстрація"
            onClickEvent={() => setIsModalOpen("Реєстрація")}
          ></Button>
        </div>
      )}

      <Modal
        isOpen={isModalOpen === "Вхід"}
        onClose={() => setIsModalOpen(null)}
      >
        <LoginForm
          onSuccessFunc={() => setIsModalOpen(null)}
          openRegister={() => setIsModalOpen("Реєстрація")}
        ></LoginForm>
      </Modal>

      <Modal
        isOpen={isModalOpen === "Реєстрація"}
        onClose={() => setIsModalOpen(null)}
      >
        <RegisterForm
          onSuccessFunc={() => setIsModalOpen(null)}
          openLogin={() => setIsModalOpen("Вхід")}
        ></RegisterForm>
      </Modal>
    </nav>
  );
};
