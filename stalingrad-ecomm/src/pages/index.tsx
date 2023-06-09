import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import Layout from "../../components/layout";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Stalingrad - магазин фигурок 1:35</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Stalingrad" />
        <meta property="og:description" content="Фигурки из смолы 1/35" />
        <meta property="og:url" content="https://stalingrad-diorama.ru/" />
      </Head>
      <section className={`container `}>
        <p>ИНТЕРНЕТ-МАГАЗИН ФИГУРОК 1:35</p>
        <h1>
          ОДНИ ИЗ ЛУЧШИХ СМОЛЯНЫХ ФИГУРОК <br />
          <span> СДЕЛАНО В РОССИИ</span>
        </h1>{" "}
        <p>Stalingrad - всегда качественные, всегда оригинальные фигурки для ваших диорам.</p>{" "}
        <Link href="/">Смотреть каталог</Link> <Link href="/">Узнать больше</Link>
      </section>
      <section className={`container `}>
        <div>
          <h3>Выберите фигурки для вашей новой идеи - более 300 оригинальных фигурок в каталоге.</h3>
        </div>
        <div>
          <p>
            Интернет-магазин Stalingrad-shop предлагает интересные фигурки одного из ведущих мировых производителей
            смолы - компании Stalingrad. Фигурки изготовлены в России из качественной полиэфирной смолы. Интересные
            темы, историческая достоверность, качественная скульптура, легкая сборка - все это фигурки Stalingrad. И тут
            вы можете приобрести их прямо от производителя.
          </p>
        </div>
      </section>
      <section className="container">
        <div>
          <h4>Для любителей истории ВОВ</h4>
          <p>
            История Великой Отечественной наша страсть. Большая часть ассортимента - это фигурки советских и немецких
            солдат на Восточном фронте. Вряд ли можно назвать еще один конфликт, ставший настолько явным воплощением
            борьбы Добра и Зла. Вряд ли ещё какое-либо событие истории нашей Родины было настолько тяжелым и
            героическим.
          </p>
          <Link href="/">Все фигурки на ВОВ</Link>
        </div>
        <div>
          <h4>Для моделистов</h4>
          <p>
            Фигурки Stalingrad задуманы не просто как товар на продажу. Каждая фигурка, каждая серия фигурок - это
            готовая идея для диорамы или виньетки. Покупая набор Stalingrad вы покупаете небольшую историю, черновик для
            новой диорамы. Мы строим диорамы вместе, работаем сообща - Stalingrad дает вам очень интересный кубик в ваш
            &quot;конструктор&quot;. Вам же остается придумать генеральную идею, композицию; собрать, покрасить все;
            выбрать технику, основание, название.
          </p>
          <Link href="/">Весь ассортимент</Link>
        </div>
        <div>
          <h4>Для Интернет-магазинов</h4>
          <p>
            Основной канал продаж Stalingrad - это самые лучшие и известные интернет-магазины России и мира. Посмотрите
            список наших дистрибьюторов. Многие успешно работают с нами уже более 10 лет. Уверен, все подтвердят: ясные
            четкие условия поставки и сроки - это наш конёк. Напишите нам, если тоже хотите продавать фигурки Stalingrad
          </p>
          <Link href="/">Написать нам</Link>
        </div>
      </section>
      <section className="container">
        <h3>О компании Stalingrad</h3>
        <p>
          Stalingrad существует с 2008 года. Это сольный проект Александра Зеленкова. Главная цель - это производить
          интересные фигурки. Такие фигурки, которые бы дарили новые идеи, освобождали бы моделистов от узкого выбора
          типовых, традиционных сюжетов.
        </p>
        <div>
          <h4>Идеи</h4>
          <p>Позы, идеи, эмоции - вот за что нас любят. Наши фигурки не только стоят и идут.</p>
        </div>
        <div>
          <h4>Качество</h4>
          <p>Фигурки изготовлены из специальной полиэфирной смолы. Качество наш пунктик.</p>
        </div>
        <div>
          <h4>Ассортимент</h4>
          <p>Более 300 наборов. РККА, немцы, начало войны, конец войны, гражданские, Первая мировая.</p>
        </div>
        <div>
          <h4>Наличие</h4>
          <p>Главный склад Stalingrad. Почти всё в наличии. Отправка в течении двух дней.</p>
        </div>
      </section>
      <section className="container">
        <h2>Stalingrad-shop - интернет-магазин оригинальных смоляных фигурок из России.</h2>
        <p>В ассортименте магазина представлено более 300 наборов фигурок Stalingrad.</p>
        <div>
        <Link href="/">Красная армия</Link>
        <Link href="/">Немцы</Link>
        <Link href="/">Гражданские</Link>
        <Link href="/">Современка</Link>
        <Link href="/">Первая мировая</Link>
        <Link href="/">Фантастика</Link>
        <Link href="/">Масштаб 1:35</Link>
        <Link href="/">Масштаб 1:16</Link>
        <Link href="/">Масштаб 1:48</Link>
        <Link href="/items/all/1/">Все фигурки по номерам</Link>
        <Link href="/items/all-by-date/1/">Все фигурки по дате релиза</Link>
        </div>
      </section>
      <section className="container">
        <h2>Бестселлеры</h2>
        <div>
          <div>
            <h3>S-3221</h3>
            <h4>German tank crewman, 1943-45</h4>
          </div>
        </div>
      </section>
      <section className="container">
        <h2>
          В данный момент сайт находится в тестовом режиме и заказ фигурок не доступен. По всем вопросам пишите на
        </h2>
        <a href="mailto:stalingrad.figures@gmail.com">stalingrad.figures@gmail.com</a>
      </section>
      <section className="container">
        <Link replace href="/items/all/1/">
          all items by cat num
        </Link>
        <Link replace href="/items/all-by-date/1/">
          all items by date
        </Link>
      </section>
    </Layout>
  );
}
