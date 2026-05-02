import { useMemo, useState } from "react";
import TrainList from "../../components/TrainList/TrainList";
import { trains } from "../../data/trains";
import "./Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [tempSearchQuery, setTempSearchQuery] = useState("");

  const filteredTrains = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return trains;
    }

    return trains.filter((train) => {
      const route = `${train.from} ${train.to}`.toLowerCase();
      const reverseRoute = `${train.to} ${train.from}`.toLowerCase();
      const number = train.number.toLowerCase();

      return (
        number.includes(normalizedQuery) ||
        route.includes(normalizedQuery) ||
        reverseRoute.includes(normalizedQuery) ||
        train.from.toLowerCase().includes(normalizedQuery) ||
        train.to.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [searchQuery]);

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

      <section className="home__search">
        <label className="home__search-label" htmlFor="train-search">
          Пошук рейсу
        </label>

        <input
          id="train-search"
          className="home__search-input"
          type="text"
          placeholder="Введіть номер потяга або місто..."
          value={tempSearchQuery}
          onChange={(event) => setTempSearchQuery(event.target.value)}
        />
        <button
          className="home__search-btn"
          onClick={(event) => setSearchQuery(tempSearchQuery)}
        >
          Знайти
        </button>

        <p className="home__search-result">
          Знайдено рейсів: <strong>{filteredTrains.length}</strong>
        </p>
      </section>

      <TrainList trains={filteredTrains} />
    </main>
  );
}

export default Home;
