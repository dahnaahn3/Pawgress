from pydantic import BaseModel, ValidationError
from queries.pool import pool
from typing import Union
from queries.common import Error
from typing import List


class AccountIn(BaseModel):
    first_name: str
    last_name: str
    address: str
    email: str
    phone_number: str
    password: str


class AccountOut(BaseModel):
    id: str
    email: str
    password: str
    first_name: str
    last_name: str


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class DuplicateAccountError(ValueError):
    pass


class UserOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    address: str
    email: str
    phone_number: str


class AccountQueries:
    def record_to_account_out(self, record) -> AccountOutWithPassword:
        account_dict = {
            "user_id": record[0],
            "email": record[1],
            "hashed_password": record[2],
        }
        return account_dict

    def create(
        self, users: AccountIn, hashed_password: str
    ) -> AccountOutWithPassword:
        try:
            print("USER", users)
            print("HASHED", hashed_password)
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO users
                            (
                            first_name,
                            last_name,
                            address,
                            email,
                            phone_number,
                            hashed_password
                            )
                        VALUES
                            (%s, %s, %s, %s, %s, %s)
                        RETURNING
                        id,
                        first_name,
                        last_name,
                        address,
                        email,
                        phone_number,
                        hashed_password
                        """,
                        [
                            users.first_name,
                            users.last_name,
                            users.address,
                            users.email,
                            users.phone_number,
                            hashed_password,
                        ],
                    )
                    print("insert worked????")
                    id = result.fetchone()[0]
                    print("ID GOTTEN", id)
                    return AccountOutWithPassword(
                        id=id,
                        email=users.email,
                        password=users.password,
                        first_name=users.first_name,
                        last_name=users.last_name,
                        hashed_password=hashed_password,
                    )
        except Exception as e:
            return AccountOutWithPassword(
                message="could not create user. Error:" + str(e)
            )

    def get(self, email: str) -> AccountOutWithPassword:
        try:
            print("is trying get somehow?")
            print("email", email)
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT
                        id,
                        email,
                        hashed_password
                        FROM users
                        WHERE email = %s
                        """,
                        [email],
                    )
                    record = result.fetchone()
                    print("record found", record)
                    if record is None:
                        return None
                    return self.record_to_account_out(record)
        except Exception:
            return {"message": "Could not get account"}

    def record_to_user_out(self, record) -> UserOut:
        return {
            "id": record[0],
            "first_name": record[1],
            "last_name": record[2],
            "address": record[3],
            "email": record[4],
            "phone_number": record[5],
        }

    def user_in_and_out(self, user_id: int, user: AccountIn):
        inserted_data = user.dict()
        return UserOut(id=user_id, **inserted_data)

    def get_all(self) -> Union[List[UserOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, first_name, last_name, address, email, phone_number
                        FROM users
                        ORDER BY last_name;
                        """
                    )
                    result = db.fetchall()
                    return [
                        self.record_to_user_out(record) for record in result
                    ]
        except Exception:
            return {"message": "Could not get users"}

    def get_user(self, user_id: int) -> Union[UserOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, first_name, last_name, address, email, phone_number
                        FROM users
                        WHERE id = %s
                        """,
                        [user_id],
                    )
                    result = db.fetchone()
                    return self.record_to_user_out(result)
        except Exception as e:
            raise e

    def delete(self, user_id: int) -> str:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        DELETE FROM users
                        WHERE id = %s
                        """,
                        [user_id],
                    )
                    if result.rowcount == 0:
                        return "User does not exist"
                    else:
                        return "Successfully removed removed"
        except Exception as e:
            print(e)
            raise e
