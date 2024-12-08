from pydantic import BaseModel

class ChapterSuggestionResponse(BaseModel):
    """
    Response model for Chapter Suggestion API
    """
    suggestions: str

class ReconstructStoryResponse(BaseModel):
    """
    Response model for Story Reconstruction API
    """
    story: str
