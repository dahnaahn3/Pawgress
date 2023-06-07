from fastapi.testclient import TestClient
from main import app
from queries.rooms import RoomQueries
from authenticator import authenticator

client = TestClient(app)

class MockAuthenticator:
    def get_current_account_data(self):
        return {"id": 1, "username": "string", "role_id": 0}


class EmptyRoomQueries:
    def get_all_rooms(self):
        return []


class CreateRoomQueries:
    def create_room(self,room):
        result = {
            "room_id": 1,
            "room_number": "1",
            "occupied": True,
            "pet_id": 1
        }
        result.update(room)
        return result

def test_get_all_rooms():
    app.dependency_overrides[RoomQueries] = EmptyRoomQueries
    app.dependency_overrides[authenticator.get_current_account_data] = MockAuthenticator

    response = client.get("/api/rooms")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == []

def test_create_room():
    app.dependency_overrides[RoomQueries] = CreateRoomQueries
    app.dependency_overrides[authenticator.get_current_account_data] = MockAuthenticator

    json = {
        "room_number": "1",
        "occupied": True,
        "pet_id": 1
    }
    expected = {
        "room_id": 1,
        "room_number": "1",
        "occupied": True,
        "pet_id": 1
    }
    response = client.post('/api/rooms', json=json)
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == expected
