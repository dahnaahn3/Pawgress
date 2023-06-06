# from main import app
# from fastapi.testclient import TestClient
# from queries.classes import ClassQueries

# client = TestClient(app)


# class GetAllClassesQueries:
#     def get_all_classes(self):
#         return []


# def test_get_all_classes():
#     # arrange
#     app.dependency_overrides[ClassQueries] = GetAllClassesQueries

#     # Act
#     response = client.get("/api/classes")

#     # Assert
#     assert response.status_code == 200


#     # Cleanup
#     app.dependency_overrides = {}
