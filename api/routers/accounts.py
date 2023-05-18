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

from pydantic import BaseModel

from queries.accounts import (
    AccountIn,
    AccountOut,
    AccountQueries,
    DuplicateAccountError,
)

from queries.common import Error
from typing import Union


class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: AccountOut


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.get("/api/protected", response_model=bool)
async def get_token(
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
    print("here hashed_password", hashed_password)
    print("here")
    try:
        print("trying")
        account = repo.create(info, hashed_password)
        print("account from create method", account)
        print("done trying")
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    print("here we are nowww")
    form = AccountForm(username=info.email, password=info.password)
    print("form:::: ", form)
    token = await authenticator.login(response, request, form, repo)
    print("token", token)
    return AccountToken(account=account, **token.dict())


@router.put("/api/accounts/{user_id}", response_model=AccountOut | Error)
async def update_account(
    user_id: int,
    user: AccountIn,
    repo: AccountQueries = Depends(),
) -> Union[Error, AccountOut]:
    try:
        user = repo.update(user_id, user)
    except Exception:
        return {"message": "could not be updated"}
    return user
