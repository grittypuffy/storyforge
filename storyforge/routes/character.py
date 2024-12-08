from fastapi import APIRouter, Depends, HTTPException, Query
from typing import List, Optional
from pydantic import BaseModel
from storyforge.services.character import generate_character_descriptions
from storyforge.services.character import generate_character_image
from storyfore.services.character import suggest_character_names

character_router = APIRouter()


@character_router.get("/description", response_model=CharacterDescriptionResponse)
async def generate_descriptions(
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


@character_router.get("/image", response_model=CharacterImageResponse)
async def generate_image(
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



@character_router.get("/name", response_model=CharacterNameResponse)
async def suggest_names(
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