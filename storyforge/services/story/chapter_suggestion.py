# service to generate chapter wise suggestion for the story

from services.textmodel import tokenizer, model

# function to generate chapter wise suggestion for the story\
# story_description: str, description of the story for which chapter wise suggestion is to be generated
# chapter_count: int, number of chapters for which suggestion is to be generated    
# returns: str, generated chapter wise suggestion for the given story description
def generate_chapter_suggestion(story_description, chapter_count):
    prompt = f"Generate chapter wise suggestion for the story: \" {story_description} \" with {chapter_count} chapters."
    inputs = tokenizer(prompt, return_tensors="pt")
    outputs = model.generate(**inputs, max_length=len(chapter_count)*30)
    suggestion = tokenizer.batch_decode(outputs)[0]
    return suggestion
