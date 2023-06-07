from main import app
from fastapi.testclient import TestClient
from queries.accounts import AccountQueries

client = TestClient(app)


class GetAllAccountQueries:
    def get_all(self):
        return []


class UpdateAccountQueries:
    def update_details(self, user_id, user):
        updated_user = {
            "id": user_id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "address": user.address,
            "email": user.email,
            "phone_number": user.phone_number,
            "role": user.role,
        }
        return updated_user


def test_get_all_users():
    # arrange
    app.dependency_overrides[AccountQueries] = GetAllAccountQueries

    # Act
    response = client.get("/api/accounts")

    # Assert
    assert response.status_code == 200

    response_data = response.json()
    assert isinstance(response_data, list)
    for user in response_data:
        assert "id" in user
        assert "first_name" in user
        assert "last_name" in user
        assert "address" in user
        assert "email" in user
        assert "phone_number" in user
        assert "role" in user

    # Cleanup
    app.dependency_overrides = {}


def test_update_user():
    # Arrange
    app.dependency_overrides[AccountQueries] = UpdateAccountQueries

    # Act
    user_id = 1
    json = {
        "first_name": "Janice",
        "last_name": "Doe",
        "address": "300 Elk Drive",
        "email": "jdoe@outlook.com",
        "phone_number": "555-555-5555",
        "role": "Customer",
    }

    expected_response = {
        "id": user_id,
        "first_name": "Janice",
        "last_name": "Doe",
        "address": "300 Elk Drive",
        "email": "jdoe@outlook.com",
        "phone_number": "555-555-5555",
        "role": "Customer",
    }
    response = client.put(f"/api/accounts/{user_id}", json=json)

    # Assert
    assert response.status_code == 200
    assert response.json() == expected_response

    # Cleanup
    app.dependency_overrides = {}
