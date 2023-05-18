from pydantic import BaseModel
from .pool import pool
from .common import Error
from typing import Union, Optional


class PetIn(BaseModel):
    name: str
    breed: str
    gender: str
    age: int
    picture: Optional[str]
    size: str
    weight: int
    diet: str
    owner_id: int


class PetOut(BaseModel):
    id: int
    name: str
    breed: str
    gender: str
    age: int
    picture: Optional[str]
    size: str
    weight: int
    diet: str
    owner_id: int


class PetQueries:
    def create(self, pets: PetIn) -> Union[PetOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO pets
                            (
                            name,
                            breed,
                            gender,
                            age,
                            size,
                            weight,
                            diet,
                            owner_id
                            )
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            pets.name,
                            pets.breed,
                            pets.gender,
                            pets.age,
                            pets.size,
                            pets.weight,
                            pets.diet,
                            pets.owner_id,
                        ],
                    )
                    id = result.fetchone()[0]
                    return self.pet_in_to_out(id, pets)

        except Exception as e:
            raise e

    def record_to_pet_out(self, record) -> PetOut:
        pet_dict = {
            "pet_id": record[0],
            "name": record[1],
            "breed": record[2],
            "gender": record[3],
            "age": record[4],
            "picture": record[5],
            "size": record[6],
            "weight": record[7],
            "diet": record[8],
            "owner_id": record[9],
        }
        return pet_dict

    def pet_in_to_out(self, id: int, pet: PetIn):
        data = pet.dict()
        return PetOut(id=id, **data)
