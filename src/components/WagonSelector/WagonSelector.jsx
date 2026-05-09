import "./WagonSelector.css";

export function WagonSelector({ wagons, selectedWagonId, onSelectWagon }) {
  return (
    <section className="wagon-selector">
      <div className="wagon-selector__header">
        <h2 className="wagon-selector__title">Оберіть вагон</h2>
      </div>

      <div className="wagon-selector__list">
        {wagons.map((wagon) => (
          <button
            key={wagon.id}
            className={
              selectedWagonId === wagon.id
                ? "wagon-selector__item wagon-selector__item--active"
                : "wagon-selector__item"
            }
            type="button"
            onClick={() => onSelectWagon(wagon)}
          >
            <span className="wagon-selector__number">Вагон {wagon.number}</span>
            <span className="wagon-selector__seats">
              {wagon.seatsCount} місць
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default WagonSelector;
