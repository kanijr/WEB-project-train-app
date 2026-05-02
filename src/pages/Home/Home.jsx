import TrainList from "../../components/TrainList/TrainList";
import { trains } from "../../data/trains";
import "./Home.css";

function Home() {
  return (
    <main className="home">
      <section className="home__hero">
        <div>
          <p className="home__subtitle">Система продажу залізничних квитків</p>
          <h1 className="home__title">Пошук рейсів Укрзалізниці</h1>
          <p className="home__description">
            Переглядайте доступні потяги, маршрути, час відправлення та
            тривалість поїздки.
          </p>
        </div>
      </section>
      <TrainList trains={trains} />
    </main>
  );
}

export default Home;
