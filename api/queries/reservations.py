from pydantic import BaseModel, ValidationError
from .pool import pool
from .common import Error
from typing import Union, List
from datetime import datetime


class ReservationIn(BaseModel):
    start_datetime: datetime
    end_datetime: datetime
    category: str
    customer_id: int
    pet_id: int


class ReservationOut(BaseModel):
    reservation_id: int
    start_datetime: datetime
    end_datetime: datetime
    category: str
    customer_id: int
    pet_id: int


class ReservationQueries:
    def create(
        self, reservation: ReservationIn
    ) -> Union[ReservationOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO reservations
                            (
                            start_datetime,
                            end_datetime,
                            category,
                            customer_id
                            )
                        VALUES
                            (%s, %s, %s, %s)
                        RETURNING reservation_id;
                        """,
                        [
                            reservation.start_datetime,
                            reservation.end_datetime,
                            reservation.category,
                            reservation.customer_id,
                        ],
                    )
                    id = result.fetchone()[0]
                    result = db.execute(
                        """
                        INSERT INTO pet_reservations
                            (
                            reservation_id,
                            pet_id
                            )
                        VALUES
                            (%s, %s);
                        """,
                        [
                            id,
                            reservation.pet_id,
                        ],
                    )
                    return self.reservation_in_to_out(id, reservation)
        except Exception as e:
            raise e

    def list_reservations(self) -> Union[List[ReservationOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT
                            reservations.reservation_id,
                            reservations.start_datetime,
                            reservations.end_datetime,
                            reservations.category,
                            reservations.customer_id,
                            pet_reservations.pet_id
                        FROM reservations
                        INNER JOIN pet_reservations
                        ON reservations.reservation_id = pet_reservations.reservation_id
                        ORDER BY start_datetime;
                        """
                    )
                    reservations = db.fetchall()
                    return [
                        self.reservation_to_reservation_out(reservation)
                        for reservation in reservations
                    ]
        except Exception as e:
            raise e

    def reservation_in_to_out(
        self, reservation_id: int, reservation: ReservationIn
    ):
        data = reservation.dict()
        return ReservationOut(reservation_id=reservation_id, **data)

    def reservation_to_reservation_out(self, reservation):
        return ReservationOut(
            reservation_id=reservation[0],
            start_datetime=reservation[1],
            end_datetime=reservation[2],
            category=reservation[3],
            customer_id=reservation[4],
            pet_id=reservation[5],
        )
