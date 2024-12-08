from fastapi import APIRouter, Depends, HTTPException, Query
from typing import List, Optional
from pydantic import BaseModel
from services.characters.character_description import generate_character_descriptions
from services.characters.character_image import generate_character_image
from services.characters.name import suggest_character_names

characterRouter = APIRouter()

# Response model for character descriptions
class CharacterDescriptionResponse(BaseModel):
    descriptions: List[str]

@characterRouter.get("/character/description", response_model=CharacterDescriptionResponse)
async def generateDescriptions(
    story: str,
    charactersList: List[str] = Query(..., alias="characters_list")
):
    try:
        descriptions = generate_character_descriptions(
            story=story,
            characters_list=charactersList
        )
        return {"descriptions": descriptions}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Response model for character image
class CharacterImageResponse(BaseModel):
    image: list

@characterRouter.get("/character/image", response_model=CharacterImageResponse)
async def generateImage(
    characterName: str,
    characterDescription: str,
    characterAge: int,
    characterGender: str
):
    try:
        image = generate_character_image(
            character_name=characterName,
            character_description=characterDescription,
            character_age=characterAge,
            character_gender=characterGender
        )
        return {"image": image}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Response model for character names
class CharacterNameResponse(BaseModel):
    names: List[str]

@characterRouter.get("/character/name", response_model=CharacterNameResponse)
async def suggestNames(
    characterCount: int,
    gendersList: List[str] = Query(..., alias="genders_list"),
    nationalityList: List[str] = Query(..., alias="nationality_list")
):
    try:
        names = suggest_character_names(
            character_count=characterCount,
            genders_list=gendersList,
            nationality_list=nationalityList
        )
        return {"names": names}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))