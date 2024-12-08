from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from pydantic import BaseModel
from services.project.cover_image import generate_cover_image
from services.project.outline import generate_outline
from services.project.title import suggest_title
from services.project.story_suggest import generate_story_suggestions
from services.project.synposis import generate_synopsis

projectRouter = APIRouter()

# Response model for the Cover Image API
class CoverImageResponse(BaseModel):
    images: list

@projectRouter.get("/project/cover_image", response_model=CoverImageResponse)
async def generateCoverImage(
    storyTitle: str,
    storyGenre: str,
    storyDescription: str
):
    try:
        images = generate_cover_image(storyTitle, storyGenre, storyDescription)
        return {"images": images}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Response model for the Story Outline API
class OutlineResponse(BaseModel):
    outline: str

@projectRouter.get("/project/outline", response_model=OutlineResponse)
async def generateOutline(
    story: str,
    outlineLength: int = Query(200, alias="outline_length")
):
    try:
        outline = generate_outline(story, outlineLength)
        return {"outline": outline}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Response model for the Story Suggestion API
class StorySuggestionsResponse(BaseModel):
    suggestion: str

@projectRouter.get("/project/story_suggestions", response_model=StorySuggestionsResponse)
async def generateStorySuggestions(
    genre: str,
    suggestionLength: int = Query(200, alias="suggestion_length")
):
    try:
        suggestion = generate_story_suggestions(genre, suggestionLength)
        return {"suggestion": suggestion}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Response model for the Story Synopsis API
class SynopsisResponse(BaseModel):
    synopsis: str

@projectRouter.get("/project/synopsis", response_model=SynopsisResponse)
async def generateSynopsis(
    story: str,
    synopsisLength: int = Query(1000, alias="synopsis_length")
):
    try:
        synopsis = generate_synopsis(story, synopsisLength)
        return {"synopsis": synopsis}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Response model for the Story Title API
class TitleResponse(BaseModel):
    title: str

@projectRouter.get("/project/title", response_model=TitleResponse)
async def suggestTitle(
    storyDescription: str,
    characters: str
):
    try:
        title = suggest_title(storyDescription, characters)
        return {"title": title}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))