from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from typing import Union

from pydantic import BaseModel
from queries.pets import PetIn, PetOut, PetQueries
from queries.common import Error
router = APIRouter()


@router.post("/pets", response_model=Union[PetOut, Error])
def create_pet(
    pet: PetIn,
    response: Response,
    repo: PetQueries = Depends(),
):
    try:
        result = repo.create(pet)
    except Exception:
        response.status_code = 400
        return {"message": "could not create pet"}
    return result
