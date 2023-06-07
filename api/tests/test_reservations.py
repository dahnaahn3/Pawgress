from fastapi.testclient import TestClient
from main import app
from queries.reservations import ReservationQueries
from authenticator import authenticator


client = TestClient(app)

class MockAuthenticator:
    def get_current_account_data(self):
        return {"id": 1, "username": "string", "role_id": 0}


class EmptyReservationQueries:
    def list_reservations(self):
        return []


class CreateReservationQueries:
    def create(self, reservation):
        result = {
            "reservation_id": 1,
        }

        result.update(reservation)
        return result


def test_get_all_reservations():
    # Arrange
    app.dependency_overrides[ReservationQueries] = EmptyReservationQueries
    app.dependency_overrides[authenticator.get_current_account_data] = MockAuthenticator

    # response = client.get("/api/reservation")
    response = client.get("/reservation")
    # Act
    app.dependency_overrides = {}
    # Assert
    assert response.status_code == 200 or response.status_code == 404
    if response.status_code == 404:
        assert response.json() == {"message": "No reservations"}
    elif response.status_code == 200:
        assert response.json() == {"reservations": []}


def test_create_reservation():
    # Arrange
    app.dependency_overrides[ReservationQueries] = CreateReservationQueries
    app.dependency_overrides[authenticator.get_current_account_data] = MockAuthenticator
    # Act
    json = {
        "start_datetime": "2023-06-06T19:27:46.732000",
        "end_datetime": "2023-06-07T19:27:46.732000",
        "category": "BOARDING",
        "customer_id": 1,
        "pet_id": 1,
    }

    expected = {
        "reservation_id": 1,
        "start_datetime": "2023-06-06T19:27:46.732000",
        "end_datetime": "2023-06-07T19:27:46.732000",
        "category": "BOARDING",
        "customer_id": 1,
        "pet_id": 1,
    }

    response = client.post("/reservation", json=json)
    app.dependency_overrides = {}
    # Assert
    assert response.status_code == 200
    assert response.json() == expected
