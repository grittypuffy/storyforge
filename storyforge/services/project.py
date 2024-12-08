from storyforge.services.model.text import tokenizer, model
from storyforge.services.model.image import pipeline

def generate_cover_image(story_title: str, story_genre: str, story_description: str) -> list:
    """
    Generate a cover image for the given story
    :param story_title: title of the story
    :param story_genre: genre of the story
    :param story_description: description of the story
    :return: generated cover image for the given story
    """
    prompt = f"Generate a cover image for the story with title: {story_title}, genre: {story_genre} and description: {story_description}"
    images = pipeline(prompt, num_inference_steps=4).images
    return images



def generate_outline(story: str, outline_length: int =200) -> str:
    """
    Generate the outline for the given story
    :param story: str, story for which outline is to be generated
    :param outline_length: length of the outline in number of characters
    :return: generated outline for the given story
    """
    prompt = f"Generate an outline for the given story below: {story} in a pointwise manner"
    inputs = tokenizer(prompt, return_tensors="pt")
    outputs = model.generate(**inputs, max_length=outline_length)
    outline = tokenizer.batch_decode(outputs)[0]
    return outline

def generate_story_suggestions(genre: str, suggestion_length: int =200) -> str:
    """
    Generate some story line suggestions for the users
    :param genre: genre for which story line suggestions are to be generated
    :param suggestion_length: length of the story line suggestion in number of characters
    :return: generated story line suggestion for the given genre
    """
    prompt = f"Generate few story line suggestions for the given genre: {genre} so that it will be helpful for me to write story on it."
    inputs = tokenizer(prompt, return_tensors="pt")
    outputs = model.generate(**inputs, max_length=suggestion_length)
    suggestion = tokenizer.batch_decode(outputs)[0]
    return suggestion


def generate_synopsis(story: str, synosis_length: int =1000) -> str:
    """
    Generate the synopsis for the given story
    :param story: story for which synopsis is to be generated
    :param synosis_length: length of the synopsis in number of characters
    :return: generated synopsis for the given story
    """
    prompt = f"Generate a synopsis for the given story below: {story}"
    inputs = tokenizer(prompt, return_tensors="pt")
    outputs = model.generate(**inputs, max_length=synosis_length)
    synopsis = tokenizer.batch_decode(outputs)[0]
    return synopsis


def suggest_title(story_description: str, characters: str) -> str:
    """
    Suggest the title for the given story description and characters
    :param story_description: description of the story
    :param characters: characters in the story
    :return: suggested title for the story
    """
    prompt = f"Give me a suitable title for the story with description {story_description} with characters {characters}"
    inputs = tokenizer(prompt, return_tensors="pt")
    outputs = model.generate(**inputs, max_length=30)
    title = tokenizer.batch_decode(outputs)[0]
    return title