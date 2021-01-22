import React, { useState, useEffect } from "react";

const url = "https://course-api.com/react-tours-project";

function Tours() {
  const [tours, setTours] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((tours) => setTours(tours));
  }, []);

  const remove = (id) => {
    let newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  if (tours.length < 1) {
    return (
      <main>
        <h1 className="title">No More City Tours Availaible</h1>
        <button className="btn" onClick={() => window.location.reload()}>
          Reload
        </button>
      </main>
    );
  }

  return (
    <main>
      <section>
        <div className="title">
          <h2>{tours.length} City Tours Availaible</h2>
          <div className="underline"></div>
        </div>
        <div>
          {tours.map((tour) => {
            const { info, id, name, image, price } = tour;
            return (
              <article key={id} className="single-tour">
                <img src={image} alt="name" />
                <footer>
                  <div className="tour-info">
                    <h4>{name}</h4>
                    <h4 className="tour-price">${price}</h4>
                  </div>
                  <p>
                    {showMore ? info : `${info.substring(0, 190)}...`}
                    <button onClick={() => setShowMore(!showMore)}>
                      {showMore ? "show less" : "Show more"}
                    </button>
                  </p>
                  <button className="delete-btn" onClick={() => remove(id)}>
                    Not Interested
                  </button>
                </footer>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default Tours;
