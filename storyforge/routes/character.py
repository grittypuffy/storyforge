from fastapi import APIRouter, Depends

character_router = APIRouter()

@character_router.get("/image")
async def suggest_images():
    pass


@character_router.get("/name")
async def suggest_names():
    pass


@character_router.get("/description/personality")
async def suggest_personality():
    pass

@character_router.get("/description/appearance")
async def suggest_appearance():
    pass


@character_router.get("/description/background")
async def suggest_background():
    pass