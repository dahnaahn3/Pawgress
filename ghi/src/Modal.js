import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";

function BoardingModal() {
  const [history, setHistory] = useState([]);

  const fetchData = async () => {
    const url = "http://localhost:8000/reservation";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setHistory(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [reservation, setReservation] = useState({
    start_datetime: "",
    end_datetime: "",
    category: "",
    customer_id: "",
    pet_id: "",
  });

  const handleReservationChange = (event) => {
    const value = event.target.value;
    const inputName = event.target.name;
    setReservation({
      ...reservation,
      [inputName]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const reservationUrl = "http://localhost:8000/reservation";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(reservation),
      headers: {
        "Content-type": "application/json",
      },
    };

    const response = await fetch(reservationUrl, fetchConfig);
    if (response.ok) {
      setReservation({
        start_datetime: "",
        end_datetime: "",
        category: "",
        customer_id: "",
        pet_id: "",
      });
      navigate("/");
    }
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  function openModal() {
    setModalIsOpen(true);
  }
  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <div>
      <div className="my-5 container">
        <Link to={".."}>
          <button className="btn">Make a reservation</button>
        </Link>
      </div>
      {history && history.length ? (
        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Reservation Number</th>
                <th>Pet</th>
                <th>Dropoff Date and Time</th>
                <th>Pickup Date and Time</th>
              </tr>
            </thead>
            <tbody>
              {history.map((reservation) => {
                let start_datetime = reservation.start_datetime;
                let end_datetime = reservation.end_datetime;
                start_datetime = new Date(start_datetime);
                end_datetime = new Date(end_datetime);
                console.log(reservation);
                return (
                  <tr key={reservation.reservation_id}>
                    <td>{reservation.reservation_id}</td>
                    <td>{reservation.pet_id}</td>
                    <td>{start_datetime.toLocaleString()}</td>
                    <td>{end_datetime.toLocaleString()}</td>
                    <td>
                      <button
                        onClick={() => {
                          setModalIsOpen(true);
                          setModalData(reservation);
                        }}
                        className="btn"
                      >
                        Create Reservation
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Make reservation Modal"
              ariaHideApp={false}
            >
              <div>
                <h1>Create a boarding reservation</h1>
                <form onSubmit={handleSubmit}>
                  <div>
                    <input
                      onChange={handleReservationChange}
                      placeholder="Dropoff Date"
                      type="datetime-local"
                      name="start_datetime"
                    />
                    <label htmlFor="start_datetime">
                      Dropoff Date and Time
                    </label>
                  </div>
                  <div>
                    <input
                      onChange={handleReservationChange}
                      placeholder="Pickup Date"
                      type="datetime-local"
                      name="end_datetime"
                    />
                    <label htmlFor="end_datetime">Pickup Date and Time</label>
                  </div>
                  <div>
                    <input
                      onChange={handleReservationChange}
                      placeholder="Category"
                      type="text"
                      name="category"
                    />
                    <label htmlFor="category">Category</label>
                  </div>
                  <div>
                    <input
                      onChange={handleReservationChange}
                      placeholder="Customer ID"
                      type="text"
                      name="customer_id"
                    />
                    <label htmlFor="customer_id">Customer ID</label>
                  </div>
                  <div>
                    <input
                      onChange={handleReservationChange}
                      placeholder="Pet ID"
                      type="text"
                      name="pet_id"
                    />
                    <label htmlFor="pet_id">Pet ID</label>
                  </div>
                  <button>Add</button>
                  <button
                    onClick={() => {
                      setModalIsOpen(false);
                      setModalData(reservation);
                    }}
                    className="btn"
                  >
                    Close modal
                  </button>
                </form>
              </div>
            </Modal>
          </table>
        </div>
      ) : (
        <p>No Previous Boarding History</p>
      )}
    </div>
  );
}

export default BoardingModal;
