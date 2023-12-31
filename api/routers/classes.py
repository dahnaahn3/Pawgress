from typing import Union, List, Optional
from queries.classes import ClassIn, ClassOut, ClassQueries
from authenticator import authenticator
from queries.common import Error, Success
from fastapi import (
    Depends,
    Response,
    APIRouter,
)

router = APIRouter()


@router.post("/api/classes", response_model=Union[ClassOut, Error])
def create_class(
    classes: ClassIn,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ClassQueries = Depends(),
):
    try:
        result = repo.create(classes)
    except Exception:
        response.status_code = 400
        return {"message": "could not create class"}
    return result


@router.get("/api/classes", response_model=Union[List[ClassOut], Error])
def get_all_classes(
    response: Response,
    repo: ClassQueries = Depends(),
):
    try:
        result = repo.get_all_classes()
        if result:
            return result
        else:
            response.status_code = 404
            return {"message": "No classes found or empty class list"}
    except Exception:
        response.status_code = 400
        return {"message": "Error occurred while retrieving classes"}


@router.get("/api/classes/{class_id}", response_model=Union[ClassOut, Error])
def get_one_class(
    class_id: int,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ClassQueries = Depends(),
) -> Optional[ClassOut]:
    try:
        result = repo.get_one_class(class_id)
        if result:
            return result
        else:
            response.status_code = 404
            return {"message": "class does not exist"}
    except Exception:
        response.status_code = 400
        return {
            "message" "error occured when trying to retrieve class details"
        }


@router.put("/api/classes/{class_id}", response_model=Union[ClassOut, Error])
def update_class(
    class_id: int,
    classes: ClassIn,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ClassQueries = Depends(),
) -> Union[Error, ClassOut]:
    try:
        result = repo.update_class(class_id, classes)
        if result:
            return result
        else:
            response.status_code = 404
        return {"message": "class does not exist"}
    except Exception:
        response.status_code = 400
        return {"message": "updating class unsuccessful"}


@router.delete("/api/classes/{class_id}")
def delete_class(
    class_id: int,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ClassQueries = Depends(),
):
    result = repo.delete_class(class_id)
    if result == "Class does not exist":
        response.status_code = 404
        return Error(message="Class does not exist")
    else:
        return Success(message="Successfully removed class")
