export const About = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex justify-center px-6 py-16">
      <div className="max-w-4xl w-full">
        <h1 className="text-5xl font-bold text-gray-900 mb-8">Про нас</h1>

        <p className="text-lg text-gray-700 mb-12 leading-relaxed">
          Наша платформа допомагає кандидатам впевнено підготуватися до
          співбесід. Ми пропонуємо сучасні інструменти та реалістичний досвід,
          які дозволяють відчути себе впевнено під час будь-якої розмови з
          роботодавцем.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white shadow-lg rounded-2xl p-6 transition-transform hover:-translate-y-1 hover:shadow-xl">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Відповіді
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Збірка поширених запитань і приклади відповідей для якісної
              підготовки.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-6 transition-transform hover:-translate-y-1 hover:shadow-xl">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Пробні співбесіди
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Симуляції реальних інтерв’ю, щоб відчути впевненість ще до розмови
              з роботодавцем.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-6 transition-transform hover:-translate-y-1 hover:shadow-xl">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Поради</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Практичні рекомендації від експертів, що допоможуть показати себе
              з найкращого боку.
            </p>
          </div>
        </div>

        <p className="text-2xl font-medium text-gray-900">
          Ваша впевненість на співбесіді починається тут.
        </p>
      </div>
    </section>
  );
};
