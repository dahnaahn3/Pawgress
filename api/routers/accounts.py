# router.py
from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator
from typing import List, Union

from pydantic import BaseModel, ValidationError

from queries.accounts import (
    AccountIn,
    AccountOut,
    AccountOutWithPassword,
    UserInWithoutPassword,
    UserOut,
    AccountQueries,
    DuplicateAccountError,
)

from queries.common import Error


class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: AccountOut


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.get("/api/protected", response_model=bool)
async def get_protected_token(
    request: Request,
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return True


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: AccountOut = Depends(authenticator.try_get_current_account_data),
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }


@router.post("/api/accounts", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    repo: AccountQueries = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = repo.create(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.email, password=info.password)
    token = await authenticator.login(response, request, form, repo)
    return AccountToken(account=account, **token.dict())


@router.get("/api/accounts", response_model=Union[List[UserOut], Error])
def get_all_users(response: Response, repo: AccountQueries = Depends()):
    try:
        result = repo.get_all()
    except Exception:
        response.status_code = 400
        return {"message": "Error occurred while retrieving users"}
    return result


@router.get("/api/accounts/{user_id}", response_model=Union[UserOut, Error])
def get_one_user(
    user_id: int, response: Response, repo: AccountQueries = Depends()
):
    try:
        result = repo.get_user(user_id)
        if result:
            return result
        else:
            response.status_code = 404
            return {"message": "user does not exist"}
    except Exception:
        response.status_code = 400
        return {
            "message": "error occurred when trying to retrieve user details"
        }


@router.put("/api/accounts/{user_id}", response_model=Union[UserOut, Error])
def update_user(
    user_id: int,
    user: UserInWithoutPassword,
    response: Response,
    repo: AccountQueries = Depends(),
):
    try:
        result = repo.update_details(user_id, user)
        if result:
            return result
        else:
            response.status_code = 404
            return {"message": "user does not exist"}
    except Exception:
        response.status_code = 400
        return {"message": "updating user details was unsuccessful"}


@router.put(
    "/api/accounts/{user_id}/password", response_model=Union[str, Error]
)
def update_user_password(
    user_id: int,
    password: str,
    response: Response,
    repo: AccountQueries = Depends(),
):
    try:
        hashed_password = authenticator.hash_password(password)
        result = repo.update_password(user_id, hashed_password)

        if result:
            return result
        else:
            response.status_code = 404
            return {"message": "user does not exist"}
    except Exception:
        response.status_code = 400
        return {"message": "updating user password was unsuccessful"}


@router.delete("/accounts/{user_id}")
def delete_user(
    user_id: int,
    response: Response,
    repo: AccountQueries = Depends(),
):
    try:
        result = repo.delete(user_id)
        if result == "User does not exist":
            response.status_code = 404
            return {"message": "User does not exist"}
        else:
            return {"message": "Successfully removed class"}
    except Exception:
        response.status_code = 400
        return {"message": "error occurred when trying to delete user"}
