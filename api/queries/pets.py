from pydantic import BaseModel
from .pool import pool
from .common import Error
from typing import Union, Optional, List


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
    pet_id: int
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
    def create_pet(self, pets: PetIn) -> Union[PetOut, Error]:
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
                        RETURNING pet_id;
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

    def get_all_pets(self) -> Union[Error, List[PetOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, name, breed, gender, age, picture, size, weight, diet, owner_id
                        FROM pets
                        ORDER BY name;
                        """
                    )
                    return [
                        self.record_to_pet_out(record)
                        for record in result
                    ]
        except Exception as e:
            raise e

    def show_pet_detail(self, pet_id: int) -> Optional[PetOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, name, breed, gender, age, picture, size, weight, diet, owner_id
                        FROM pets
                        WHERE id = %s
                        """,
                        [pet_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_pet_out(record)
        except Exception as e:
            raise e

    def delete_pet(self, pet_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM pets
                        WHERE id = %s
                        """,
                        [pet_id]
                    )
                    return True
        except Exception:
            return False

    def update_pet(self, pet_id: int, pet: PetIn) -> Union[PetOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE pets
                        SET name = %s,
                        breed = %s,
                        gender = %s,
                        age = %s,
                        picture = %s,
                        size = %s,
                        weight = %s,
                        diet = %s,
                        owner_id = %s
                        WHERE id = %s
                        """,
                        [
                            pet.name,
                            pet.breed,
                            pet.gender,
                            pet.age,
                            pet.picture,
                            pet.size,
                            pet.weight,
                            pet.diet,
                            pet.owner_id,
                            pet_id
                        ]
                    )
                    return self.pet_in_to_out(pet_id, pet)
        except Exception as e:
            raise e

    def record_to_pet_out(self, record) -> PetOut:
        pet_dict = {
            "id": record[0],
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

    def pet_in_to_out(self, pet_id: int, pet: PetIn):
        data = pet.dict()
        return PetOut(pet_id=pet_id, **data)
