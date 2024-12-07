from fastapi import APIRouter, Depends

story_router = APIRouter()

@story_router.get("/image")
async def suggest_next_arc():
    pass


@story_router.get("/refactor/tone")
async def refactor_on_tone():
    pass


@story_router.get("/refactor/structure")
async def refactor_on_structure():
    pass

@story_router.get("/content")
async def suggest_content():
    pass


@story_router.get("/completions")
async def suggest_completions():
    pass
