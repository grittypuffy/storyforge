# service to suggest the title for the given story description and characters

from services.textmodel import tokenizer, model

# function to suggest the title for the given story description and characters
# story_description: str, description of the story
# characters: str, characters in the story
# returns: str, suggested title for the story

def suggest_title(story_description, characters):    
    prompt = f"Give me a suitable title for the story with description {story_description} with characters {characters}"
    inputs = tokenizer(prompt, return_tensors="pt")
    outputs = model.generate(**inputs, max_length=30)
    title = tokenizer.batch_decode(outputs)[0]
    return title