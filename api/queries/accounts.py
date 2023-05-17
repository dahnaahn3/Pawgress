from pydantic import BaseModel
from queries.pool import pool

class AccountIn(BaseModel):
    first_name : str
    last_name : str
    address : str
    email : str
    phone_number : str
    password : str

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


class AccountQueries:
    def record_to_account_out(self, record) -> AccountOutWithPassword:
        account_dict = {
            "user_id": record[0],
            "email": record[1],
            "hashed_password": record[2]
        }
        return account_dict


    def create(self, customers: AccountIn,
        hashed_password: str) -> AccountOutWithPassword:
        try:
            print("USER",customers)
            print("HASHED",hashed_password)
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO customers
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
                            customers.first_name,
                            customers.last_name,
                            customers.address,
                            customers.email,
                            customers.phone_number,
                            hashed_password
                        ]
                    )
                    print("insert worked????")
                    id = result.fetchone()[0]
                    print("ID GOTTEN",id)
                    return AccountOutWithPassword(
                        id=id,
                        email = customers.email,
                        password = customers.password,
                        first_name = customers.first_name,
                        last_name=customers.last_name,
                        hashed_password=hashed_password

                        # id=id,
                        # first_name = customers.first_name,
                        # last_name = customers.last_name,
                        # address = customers.address,
                        # email = customers.email,
                        # phone_number = customers.phone_number,
                        # hashed_password=password
                    )
        except Exception as e:
            return AccountOutWithPassword(message="could not create user. Error:" + str(e))


    def get(self, email: str) -> AccountOutWithPassword:
        try:
            print("is trying get somehow?")
            print("email",email)
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT
                        id,
                        email,
                        hashed_password
                        FROM customers
                        WHERE email = %s
                        """,
                        [email],
                    )
                    record = result.fetchone()
                    print("record found",record)
                    if record is None:
                        return None
                    return self.record_to_account_out(record)
        except Exception:
            return {"message": "Could not get account"}
