from fastapi.testclient import TestClient
from main import app
from queries.pets import PetQueries
from authenticator import authenticator


client = TestClient(app)


class MockAuthenticator:
    def get_current_account_data(self):
        return {"id": 1, "username": "string", "role_id": 0}


def test_create_widget():
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = MockAuthenticator


class EmptyPetQueries:
    def get_all_pets(self):
        return []


def test_get_all_pets():
    app.dependency_overrides[PetQueries] = EmptyPetQueries
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = MockAuthenticator

    response = client.get("/api/pets")

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == []


class CreatePetQueries:
    def create_pet(self, pet):
        result = {
            "pet_id": 1,
        }
        result.update(pet)
        return result

    def get_all_pets(self):
        return [
            {
                "pet_id": 1,
                "name": "Spot",
                "breed": "shitzu",
                "gender": "M",
                "age": 5,
                "picture": "dog.jpg",
                "size": "S",
                "weight": 15,
                "diet": "Kibble",
                "owner_id": 1,
            }
        ]


def test_create_pet():
    app.dependency_overrides[PetQueries] = CreatePetQueries
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = MockAuthenticator

    json = {
        "name": "Spot",
        "breed": "shitzu",
        "gender": "M",
        "age": 5,
        "picture": "dog.jpg",
        "size": "S",
        "weight": 15,
        "diet": "Kibble",
        "owner_id": 1,
    }

    expected = [
        {
            "pet_id": 1,
            "name": "Spot",
            "breed": "shitzu",
            "gender": "M",
            "age": 5,
            "picture": "dog.jpg",
            "size": "S",
            "weight": 15,
            "diet": "Kibble",
            "owner_id": 1,
        }
    ]

    response = client.get("/api/pets", json=json)

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == expected
