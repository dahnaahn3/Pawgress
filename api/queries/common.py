from pydantic import BaseModel


class Error(BaseModel):
    message: str


class Success(BaseModel):
    message: str
