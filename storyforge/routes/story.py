from fastapi import APIRouter, HTTPException, Query
from typing import Optional
from pydantic import BaseModel
from services.story.chapter_suggestion import generate_chapter_suggestion
from services.story.reconstruct import reconstruct_story

story_router = APIRouter()


@story_router.get("/chapter", response_model=ChapterSuggestionResponse)
async def get_chapter_suggestion(
    storyDescription: str = Query(..., description="Description of the story"),
    chapterCount: int = Query(..., ge=1, description="Number of chapters to generate suggestions for")
):
    try:
        suggestions = generate_chapter_suggestion(storyDescription, chapterCount)
        return {"suggestions": suggestions}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@story_router.get("/reconstruct", response_model=ReconstructStoryResponse)
async def get_reconstructed_story(
    storyInput: str = Query(..., description="Story to be reconstructed"),
    tone: Optional[str] = Query(None, description="Desired tone of the story"),
    emotion: Optional[str] = Query(None, description="Desired emotion of the story"),
    structure: Optional[str] = Query(None, description="Desired structure of the story")
):
    try:
        reconstructedStory = reconstruct_story(storyInput, tone or "", emotion or "", structure or "")
        return {"story": reconstructedStory}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))