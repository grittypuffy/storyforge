from pydantic import BaseModel

class CharacterDescriptionResponse(BaseModel):
    """
    Response model for character descriptions
    """
    descriptions: List[str]


class CharacterImageResponse(BaseModel):
    """
    Response model for character image
    """
    image: list


class CharacterNameResponse(BaseModel):
    """
    Response model for character names
    """
    names: List[str]
