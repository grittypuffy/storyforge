# service to generate the synopsis for the given story

from services.textmodel import tokenizer, model

# function to generate the synopsis for the given story
# story: str, story for which synopsis is to be generated
# synosis_length: int, length of the synopsis in number of characters
# returns: str, generated synopsis for the given story

def generate_synopsis(story, synosis_length=1000):
    prompt = f"Generate a synopsis for the given story below: {story}"
    inputs = tokenizer(prompt, return_tensors="pt")
    outputs = model.generate(**inputs, max_length=synosis_length)
    synopsis = tokenizer.batch_decode(outputs)[0]
    return synopsis