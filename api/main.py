from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from authenticator import authenticator
from routers import accounts, pets, classes, rooms, reservations

app = FastAPI()
app.include_router(authenticator.router)
app.include_router(accounts.router)
app.include_router(pets.router)
app.include_router(classes.router)
app.include_router(rooms.router)
app.include_router(reservations.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Hello Team Pawgress"}
