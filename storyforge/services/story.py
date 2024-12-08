from storyforge.services.model.text import tokenizer, model
from storyforge.services.model.image import pipeline

def generate_chapter_suggestion(story_description: str, chapter_count: int) -> str:
    """
    Generate chapter wise suggestion for the story
    :param story_description: description of the story for which chapter wise suggestion is to be generated
    :param chapter_count: number of chapters for which suggestion is to be generated    
    :return: generated chapter wise suggestion for the given story description
    """

    prompt = f"Generate chapter wise suggestion for the story: \" {story_description} \" with {chapter_count} chapters."
    inputs = tokenizer(prompt, return_tensors="pt")
    outputs = model.generate(**inputs, max_length=len(chapter_count)*30)
    suggestion = tokenizer.batch_decode(outputs)[0]
    return suggestion


def reconstruct_story(story_input: str, tone: str, emotion: str, structure: str) -> str:
    """
    Reconstruct the story based on tone, emotion, structure, etc.,
    :param story_input: story to be reconstructed
    :param tone: tone of the story to be reconstructed
    :param emotion: emotion of the story to be reconstructed
    :param structure: structure of the story to be reconstructed
    :return: reconstructed story based on the given tone, emotion, structure, etc.,
    """
    prompt = f"Reconstruct the story: \" {story_input} \" based on the given tone: {tone}, emotion: {emotion}, structure: {structure}. Provide the same story with more alignment with the given tone, emotion, structure, etc.,"
    inputs = tokenizer(prompt, return_tensors="pt")
    outputs = model.generate(**inputs, max_length=len(prompt) + 200)
    story = tokenizer.batch_decode(outputs)[0]
    return story
