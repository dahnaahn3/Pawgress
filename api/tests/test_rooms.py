from fastapi.testclient import TestClient
from main import app
from queries.rooms import RoomQueries

client = TestClient(app)

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
    response = client.get("/api/rooms")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == []

def test_create_room():
    app.dependency_overrides[RoomQueries] = CreateRoomQueries
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
