import ThemesIcon from "../assets/homeInfoBlock/themes.png";
import RewardIcon from "../assets/homeInfoBlock/reward.png";
import SocialsIcon from "../assets/homeInfoBlock/socials.png";
import { HomeInfoElement } from "./HomeInfoElement";

// Блок информации на главной странице, рассказывает о преимуществах сервиса
export default function HomeInfoBlock() {
  return (
    <section className="mt-20 mx-3 mb-20">
      <h2 className="text-center text-3xl font-bold text-gray-900">
        З JobReady ви отримаєте:
      </h2>
      <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-0 justify-evenly mt-20">
        <HomeInfoElement
          title="Вдосконалення навичок"
          desc="Вивчайте нові технології та покращуйте наявні скіли. Отримуйте доступ до різноманітних тем та ресурсів"
          icon={ThemesIcon}
        ></HomeInfoElement>
        <HomeInfoElement
          title="Тестові співбесіди"
          desc="Готуйтеся до реальних співбесід з нашими інтерв'юерами.
            Відпрацьовуйте свої навички в безпечному середовищі"
          icon={SocialsIcon}
        ></HomeInfoElement>
        <HomeInfoElement
          title="Зворотній зв'язок"
          desc="Відповідайте на запитання та отримуйте аналітику щодо співбесіди.
            Знайдіть свої слабкі та сильні місця"
          icon={RewardIcon}
        ></HomeInfoElement>
      </div>
    </section>
  );
}
