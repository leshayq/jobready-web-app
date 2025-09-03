import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import CSharpLogo from "../assets/programming_languages/csharp_logo.png";
import PythonLogo from "../assets/programming_languages/python_logo.png";
import CPlusPlusLogo from "../assets/programming_languages/c++_logo.png";
import JavaScriptLogo from "../assets/programming_languages/js_logo.png";
import MySqlLogo from "../assets/programming_languages/mysql_logo.png";
import PhpLogo from "../assets/programming_languages/php_logo.png";
import JavaLogo from "../assets/programming_languages/java_logo.png";
import ReactLogo from "../assets/programming_languages/react_logo.png";
import GitLogo from "../assets/programming_languages/git_logo.png";
import HtmlLogo from "../assets/programming_languages/html_logo.png";

export const HomeSwiper = () => {
  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="mySwiper"
      breakpoints={{
        300: {
          slidesPerView: 1,
        },
        601: {
          slidesPerView: 3,
        },
      }}
    >
      <SwiperSlide>
        <div className="flex items-center justify-center h-full">
          <img src={PythonLogo} className="max-h-48 object-contain" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex items-center justify-center h-full">
          <img src={JavaScriptLogo} className="max-h-48 object-contain" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex items-center justify-center h-full">
          <img src={ReactLogo} className="max-h-48 object-contain" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex items-center justify-center h-full">
          <img src={CPlusPlusLogo} className="max-h-48 object-contain" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex items-center justify-center h-full">
          <img src={MySqlLogo} className="max-h-48 object-contain" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex items-center justify-center h-full">
          <img src={JavaLogo} className="max-h-48 object-contain" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex items-center justify-center h-full">
          <img src={CSharpLogo} className="max-h-48 object-contain" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex items-center justify-center h-full">
          <img src={PhpLogo} className="max-h-48 object-contain" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex items-center justify-center h-full">
          <img src={GitLogo} className="max-h-48 object-contain" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex items-center justify-center h-full">
          <img src={HtmlLogo} className="max-h-48 object-contain" />
        </div>
      </SwiperSlide>
    </Swiper>
  );
};
