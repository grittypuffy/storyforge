# service to reconstruct the story based on tone, emotion, structure, etc.,

from services.textmodel import tokenizer, model

# function to reconstruct the story based on tone, emotion, structure, etc.,
# story_input: str, story to be reconstructed
# tone: str, tone of the story to be reconstructed
# emotion: str, emotion of the story to be reconstructed
# structure: str, structure of the story to be reconstructed
# returns: str, reconstructed story based on the given tone, emotion, structure, etc.,
def reconstruct_story(story_input, tone, emotion, structure):
    prompt = f"Reconstruct the story: \" {story_input} \" based on the given tone: {tone}, emotion: {emotion}, structure: {structure}. Provide the same story with more alignment with the given tone, emotion, structure, etc.,"
    inputs = tokenizer(prompt, return_tensors="pt")
    outputs = model.generate(**inputs, max_length=len(prompt) + 200)
    story = tokenizer.batch_decode(outputs)[0]
    return story
