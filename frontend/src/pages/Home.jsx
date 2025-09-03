import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { HomeSwiper } from "../components/HomeSwiper";
import { OutlineButton } from "../components/OutlineButton";
import languagesImg from "../assets/0_tVerHf4MknjC4XiD.png";
import interviewImg from "../assets/interview-wonderful-picture-images-1.png";
import HomeInfoBlock from "../components/HomeInfoBlock";

export const Home = () => {
  useEffect(() => {
    document.title = "JobReady";
  }, []);

  return (
    <section className="flex justify-center flex-col mx-5">
      <div className="mt-16 text-center">
        <h1 className="font-semibold wrap-break-word leading-tight text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
          Підготовка до <br />
          технічної співбесіди з <br />
          <span className="bg-gradient-to-r from-[#292966] to-[#a6a6db] bg-clip-text text-transparent">
            JobReady
          </span>
        </h1>
      </div>

      <div className="text-[var(--faded-text-color)] text-center">
        <p className="mt-2.5 mb-5">
          Комплекс питань та відповіді до них для співбесід у сфері IT{" "}
        </p>
      </div>

      <div className="flex justify-center mt-4 gap-2 sm:gap-12">
        <Link to="/questions">
          <Button title="Готуватися"></Button>
        </Link>

        <Link to="/about">
          <OutlineButton title="Про нас"></OutlineButton>
        </Link>
      </div>

      <div className="text-center mt-20 overflow-x-hidden">
        <p className="text-[var(--faded-text-color)] mb-5">
          Питання з таких <b>тем:</b>
        </p>

        <HomeSwiper></HomeSwiper>
      </div>

      <HomeInfoBlock
        languagesImg={languagesImg}
        interviewImg={interviewImg}
      ></HomeInfoBlock>
    </section>
  );
};
