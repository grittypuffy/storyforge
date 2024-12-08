from storyforge.services.model.text import tokenizer, model
from storyforge.services.model.image import pipeline

def generate_character_descriptions(story: str, characters_list: list) -> list:
    """
    Generate descriptions for the characters in the story
    :param story: story for which character descriptions are to be generated
    :param characters_list: list of characters for which descriptions are to be generated
    :return: generated descriptions for the characters in the story"""

    prompt = f"Generate descriptions for the characters in the story: {story} with their respective names are as follows: {str(characters_list)}."
    inputs = tokenizer(prompt, return_tensors="pt")
    outputs = model.generate(**inputs, max_length=len(characters_list) * 10)
    descriptions = tokenizer.batch_decode(outputs)[0].split("\n")
    return descriptions


def generate_character_image(character_name: str, character_description: str, character_age: int, character_gender: str) -> list:
    """
    Generate a character image for the given character
    :param character_name: name of the character
    :param character_description: description of the character
    :param character_age: age of the character
    :param character_gender: gender of the character
    :return: generated character image for the given character
    """
    
    prompt = f"Generate a character image for the character with name: {character_name}, description: {character_description}, age: {character_age}, gender: {character_gender}"
    images = pipeline(prompt, num_inference_steps=4).images
    return images


def suggest_character_names(character_count: int, genders_list: list, nationality_list: list) -> list:
    """
    Suggest names for the characters in the story
    :param character_count: number of characters for which names are to be suggested
    :param genders_list: list of male / female / non binary representations of the characters which is the same length as character_count
    :param nationality_list: list of nationalities of the characters which is the same length as character_count
    :return: generated names for the characters in the story
    """
    prompt = f"Generate names for the {character_count} number of characters in the story with their respective genders and nationalities are as follows: {genders_list} and {nationality_list}."
    inputs = tokenizer(prompt, return_tensors="pt")
    outputs = model.generate(**inputs, max_length=character_count * 10)
    names = tokenizer.batch_decode(outputs)[0].split("\n")
    return names