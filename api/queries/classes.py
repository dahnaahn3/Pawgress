from pydantic import BaseModel
from .pool import pool
from .common import Error
from typing import Union, Optional, List
from datetime import date
from fastapi import HTTPException


class ClassIn(BaseModel):
    name: str
    category: str
    max_attendees: int
    start_datetime: date
    end_datetime: date
    description: str


class ClassOut(BaseModel):
    class_id: int
    name: str
    category: str
    attendees: Optional[int]
    max_attendees: int
    start_datetime: date
    end_datetime: date
    description: str


class ClassQueries:
    def create(self, classes: ClassIn) -> Union[ClassOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO classes
                            (
                            name,
                            category,
                            max_attendees,
                            start_datetime,
                            end_datetime,
                            description
                            )
                        VALUES
                            (%s, %s, %s, %s, %s, %s)
                        RETURNING class_id;
                        """,
                        [
                            classes.name,
                            classes.category,
                            classes.max_attendees,
                            classes.start_datetime,
                            classes.end_datetime,
                            classes.description
                        ]
                    )
                    id = result.fetchone()[0]
                    return self.class_in_to_out(id, classes)
        except Exception as e:
            raise e

    def get_all_classes(self) -> Union[Error, List[ClassOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT
                            class_id,
                            name,
                            category,
                            attendees,
                            max_attendees,
                            start_datetime,
                            end_datetime,
                            description
                        FROM classes
                        ORDER BY start_datetime;
                        """
                    )
                    records = db.fetchall()
                    return [self.record_to_class_out(record) for record in records]
        except Exception as e:
            raise e

    def get_one_class(self, class_id: int) -> Optional[ClassOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT
                            class_id,
                            name,
                            category,
                            attendees,
                            max_attendees,
                            start_datetime,
                            end_datetime,
                            description
                        FROM classes
                        Where class_id = %s
                        """,
                        [class_id]
                    )
                    record = result.fetchone()
            if record is not None:
                return self.record_to_class_out(record)
            else:
                raise HTTPException(status_code=404, detail="class does not exist")
        except Exception as e:
            raise e

    def update_class(self, class_id: int, classes: ClassIn) -> Union[ClassOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        UPDATE classes
                        SET name = %s,
                        category = %s,
                        max_attendees = %s,
                        start_datetime = %s,
                        end_datetime = %s,
                        description = %s
                        WHERE class_id = %s
                        """,
                        [
                            classes.name,
                            classes.category,
                            classes.max_attendees,
                            classes.start_datetime,
                            classes.end_datetime,
                            classes.description,
                            class_id
                        ]
                    )
                    if result.rowcount != 0:
                        return self.class_in_to_out(class_id, classes)
        except Exception as e:
            raise e

    def delete_class(self, class_id: int) -> Union[str, None]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        DELETE FROM classes
                        WHERE class_id = %s
                        """,
                        [class_id]
                    )
                    if result.rowcount == 0:
                        return "Class does not exist"
                    else:
                        return "Successfully removed class"
        except Exception:
            return None

    def class_in_to_out(self, class_id: int, classes: ClassIn):
        data = classes.dict()
        return ClassOut(class_id=class_id, **data)

    def record_to_class_out(self, record):
        return ClassOut(
            class_id=record[0],
            name=record[1],
            category=record[2],
            attendees=record[3],
            max_attendees=record[4],
            start_datetime=record[5],
            end_datetime=record[6],
            description=record[7],
        )
