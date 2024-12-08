from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from services.project.cover_image import generate_cover_image
from services.project.outline import generate_outline
from services.project.title import suggest_title
from services.project.story_suggest import generate_story_suggestions
from services.project.synposis import generate_synopsis

project_router = APIRouter()


@project_router.get("/image/cover", response_model=CoverImageResponse)
async def generate_cover_image(
    storyTitle: str,
    storyGenre: str,
    storyDescription: str
):
    try:
        images = generate_cover_image(storyTitle, storyGenre, storyDescription)
        return {"images": images}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



@project_router.get("/outline", response_model=OutlineResponse)
async def generate_outline(
    story: str,
    outlineLength: int = Query(200, alias="outline_length")
):
    try:
        outline = generate_outline(story, outlineLength)
        return {"outline": outline}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



@project_router.get("/suggestions", response_model=StorySuggestionsResponse)
async def generate_story_suggestions(
    genre: str,
    suggestionLength: int = Query(200, alias="suggestion_length")
):
    try:
        suggestion = generate_story_suggestions(genre, suggestionLength)
        return {"suggestion": suggestion}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



@project_router.get("/synopsis", response_model=SynopsisResponse)
async def generate_synopsis(
    story: str,
    synopsisLength: int = Query(1000, alias="synopsis_length")
):
    try:
        synopsis = generate_synopsis(story, synopsisLength)
        return {"synopsis": synopsis}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@project_router.get("/title", response_model=TitleResponse)
async def suggest_title(
    storyDescription: str,
    characters: str
):
    try:
        title = suggest_title(storyDescription, characters)
        return {"title": title}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))