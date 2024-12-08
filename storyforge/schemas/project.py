from pydantic import BaseModel

class CoverImageResponse(BaseModel):
    """
    Response model for the Cover Image API
    """
    images: list

class OutlineResponse(BaseModel):
    """
    Response model for the Story Outline API
    """
    outline: str
class SynopsisResponse(BaseModel):
    """
    Response model for the Story Synopsis API
    """
    synopsis: str

class TitleResponse(BaseModel):
    """
    Response model for the Story Title API
    """
    title: str

class StorySuggestionsResponse(BaseModel):
    """
    Response model for the Story Suggestion API
    """
    suggestion: str
