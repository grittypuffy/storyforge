# service to generate descriptions for the characters in the story

from services.textmodel import tokenizer, model

# function to generate descriptions for the characters in the story
# story: str, story for which character descriptions are to be generated
# characters_list: list, list of characters for which descriptions are to be generated
# returns: list, generated descriptions for the characters in the story
def generate_character_descriptions(story, characters_list):
    prompt = f"Generate descriptions for the characters in the story: {story} with their respective names are as follows: {str(characters_list)}."
    inputs = tokenizer(prompt, return_tensors="pt")
    outputs = model.generate(**inputs, max_length=len(characters_list) * 10)
    descriptions = tokenizer.batch_decode(outputs)[0].split("\n")
    return descriptions