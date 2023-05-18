from pydantic import BaseModel
from fastapi import status, HTTPException


class Error(BaseModel):
    message: str

class Success(BaseModel):
    message: str
