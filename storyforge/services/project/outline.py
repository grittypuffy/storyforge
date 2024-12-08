# service to generate the outline for the given story

from services.textmodel import tokenizer, model

# function to generate the outline for the given story
# story: str, story for which outline is to be generated
# outline_length: int, length of the outline in number of characters
# returns: str, generated outline for the given story

def generate_outline(story, outline_length=200):
    prompt = f"Generate an outline for the given story below: {story} in a pointwise manner"
    inputs = tokenizer(prompt, return_tensors="pt")
    outputs = model.generate(**inputs, max_length=outline_length)
    outline = tokenizer.batch_decode(outputs)[0]
    return outline