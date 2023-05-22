from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from typing import Union, List
from pydantic import BaseModel, ValidationError
from queries.reservations import (
    ReservationIn,
    ReservationOut,
    ReservationQueries,
)
from queries.common import Error

router = APIRouter()


@router.post("/reservation", response_model=Union[ReservationOut, Error])
def create_reservation(
    reservation: ReservationIn,
    response: Response,
    repo: ReservationQueries = Depends(),
):
    try:
        result = repo.create(reservation)
    except Exception:
        response.status_code = 400
        return {"message": "could not create reservation"}
    return result


@router.get("/reservation", response_model=Union[List[ReservationOut], Error])
def list_reservations(
    response: Response,
    repo: ReservationQueries = Depends(),
):
    try:
        result = repo.list_reservations()
        if result:
            return result
        else:
            response.status_code = 404
            return {"message": "No reservations"}
    except Exception:
        response.status_code = 400
        return {"message": "Could not get reservations"}
