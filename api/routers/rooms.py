from fastapi import APIRouter, Depends, Response
from authenticator import authenticator
from typing import Union, List
from queries.rooms import(
    RoomIn,
    RoomOut,
    RoomQueries
)
from queries.common import Error

router = APIRouter()

@router.post("/api/rooms", response_model=Union[RoomOut, Error])
def create_room(
    room: RoomIn,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: RoomQueries = Depends(),
):
    try:
        result = repo.create_room(room)
    except Exception:
        response.status_code = 400
        return {"message": "could not create room"}
    return result

@router.get("/api/rooms", response_model=Union[List[RoomOut], Error])
def get_all_rooms(
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: RoomQueries = Depends(),
):
    return repo.get_all_rooms()

@router.put("/api/rooms/{room_id}", response_model=Union[RoomOut, Error])
def update_room(
    room_id: int,
    room: RoomIn,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: RoomQueries = Depends(),
) -> Union[Error, RoomOut]:
    try:
        result = repo.update_room(room_id, room)
        if result:
            return result
        else:
            response.status_code = 404
        return{"message": "room does not exist"}
    except Exception:
        response.status_code = 400
        return {"message": "updating room was unsuccessful"}

@router.delete("/api/rooms/{room_id}", response_model=bool)
def delete_room(
    room_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: RoomQueries = Depends(),
) -> bool:
    return repo.delete_room(room_id)
