from pydantic import BaseModel
from queries.pool import pool
from typing import Union
from queries.common import Error


class AccountIn(BaseModel):
    first_name: str
    last_name: str
    address: str
    phone_number: str
    email: str
    password: str


class AccountOut(BaseModel):
    id: str
    first_name: str
    last_name: str
    address: str
    phone_number: str
    email: str
    password: str


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class DuplicateAccountError(ValueError):
    pass


class AccountQueries:
    def record_to_account_out(self, record) -> AccountOutWithPassword:
        account_dict = {
            "user_id": record[0],
            "email": record[5],
            "hashed_password": record[6],
        }
        return account_dict

    def user_in_and_out(self, user_id: int, user: AccountIn):
        inserted_data = user.dict()
        return AccountOut(id=user_id, **inserted_data)

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
                            phone_number,
                            email,
                            hashed_password
                            )
                        VALUES
                            (%s, %s, %s, %s, %s, %s)
                        RETURNING
                        id,
                        first_name,
                        last_name,
                        address,
                        phone_number,
                        email,
                        hashed_password
                        """,
                        [
                            users.first_name,
                            users.last_name,
                            users.address,
                            users.phone_number,
                            users.email,
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
                        address=users.address,
                        phone_number=users.phone_number,
                        hashed_password=hashed_password,
                    )
        except Exception as e:
            return AccountOutWithPassword(
                message="could not create user. Error:" + str(e)
            )

    def update(
        self, user_id: int, user: AccountIn
    ) -> Union[AccountOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE user
                        SET name = first_name = %s
                            , last_name = %s
                            , address = %s
                            , email = %s
                            , phone_number = %s
                            , password = %s
                        WHERE id = %s
                        """,
                        user.first_name,
                        user.last_name,
                        user.address,
                        user.email,
                        user.phone_number,
                        user.hashed_password,
                        user_id,
                    )

                    return self.user_in_and_out(user_id, user)
        except Exception:
            return {"message": "Could not update"}

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
                        first_name,
                        last_name,
                        address,
                        phone_number,
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
