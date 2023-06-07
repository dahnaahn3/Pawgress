from fastapi import (
    Depends,
    Response,
    APIRouter,
)
from typing import Union, List
from authenticator import authenticator
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
    account_data: dict = Depends(authenticator.get_current_account_data),
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
    account_data: dict = Depends(authenticator.get_current_account_data),
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
