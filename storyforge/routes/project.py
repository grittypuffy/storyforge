from fastapi import APIRouter, Depends

router = APIRouter()

@project_router.get("/genres")
async def suggest_genres():
    pass


@project_router.get("/title")
async def suggest_title():
    pass


@project_router.get("/description")
async def suggest_description():
    pass

@project_router.get("/outline")
async def suggest_outline():
    pass


@project_router.get("/image/cover")
async def suggest_cover_image():
    pass


@project_router.get("/image/arc")
async def suggest_arc_image():
    pass