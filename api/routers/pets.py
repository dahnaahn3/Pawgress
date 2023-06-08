from fastapi import (
    Depends,
    Response,
    APIRouter,
)
from typing import Union, List, Optional
from queries.pets import PetIn, PetOut, PetQueries
from authenticator import authenticator
from queries.common import Error

router = APIRouter()


@router.post("/api/pets", response_model=Union[PetOut, Error])
def create_pet(
    pet: PetIn,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: PetQueries = Depends(),
):
    try:
        result = repo.create_pet(pet)
    except Exception:
        response.status_code = 400
        return {"message": "could not create pet"}
    return result


@router.get("/api/pets", response_model=Union[List[PetOut], Error])
def get_all_pets(
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: PetQueries = Depends(),
):
    return repo.get_all_pets()


@router.get("/api/pets/{pet_id}", response_model=Optional[PetOut])
def show_pet_detail(
    pet_id: int,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: PetQueries = Depends(),
) -> PetOut:
    pet = repo.show_pet_detail(pet_id)
    if pet is None:
        response.status_code = 404
    return pet


@router.delete("/api/pets/{pet_id}", response_model=bool)
def delete_pet(
    pet_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: PetQueries = Depends(),
) -> bool:
    return repo.delete_pet(pet_id)


@router.put("/api/pets/{pet_id}", response_model=Union[PetOut, Error])
def update_pet(
    pet_id: int,
    pet: PetIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: PetQueries = Depends(),
) -> Union[Error, PetOut]:
    return repo.update_pet(pet_id, pet)
