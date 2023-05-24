from pydantic import BaseModel
from typing import Optional, Union, List
from queries.pool import pool
from queries.common import Error


class RoomIn(BaseModel):
    room_number: str
    occupied: bool
    pet_id: Optional[int]

class RoomOut(BaseModel):
    room_id: int
    room_number: str
    occupied: bool
    pet_id: Optional[int]

class RoomQueries:
    def create_room(self, room: RoomIn) -> Union[RoomOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    print("pools connected")
                    result = db.execute(
                        """
                        INSERT INTO rooms(room_number, occupied, pet_id)
                        VALUES (%s, %s, %s)
                        RETURNING room_id;
                        """,
                        [
                            room.room_number,
                            room.occupied,
                            room.pet_id,
                        ]
                    )

                    print('the results:', result)
                    print(room.room_number,
                            room.occupied,
                            room.pet_id)

                    id = result.fetchone()[0]
                    print("id", id)
                return self.room_in_to_out(id, room)
        except Exception as e:
            raise e


    def get_all_rooms(self) -> Union[Error, List[RoomOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result =db.execute(
                        """
                        SELECT room_id, room_number, occupied, pet_id
                        FROM rooms
                        ORDER BY room_number;
                        """
                    )
                    return [
                        self.record_to_room_out(record)
                        for record in result
                    ]
        except Exception as e:
            raise e


    def update_room(self, room_id: int, room: RoomIn) -> Union[RoomOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        UPDATE rooms
                        SET room_number = %s,
                        occupied = %s,
                        pet_id=%s
                        WHERE room_id=%s
                        """,
                        [
                        room.room_number,
                        room.occupied,
                        room.pet_id,
                        room_id
                    ]
                )
                if result.rowcount != 0:
                    return self.room_in_to_out(room_id, room)
        except Exception as e:
            raise e


    def delete_room(self, room_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM rooms
                        where room_id=%s
                        """,
                        [room_id]
                    )
                    return True
        except Exception as e:
            return False

    def room_in_to_out(self, room_id: int, room: RoomIn):
        data = room.dict()
        return RoomOut(room_id=room_id, **data)

    def record_to_room_out(self, record):
        return RoomOut(
            room_id=record[0],
            room_number=record[1],
            occupied=record[2],
            pet_id=record[3],
            )
