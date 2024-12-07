# Service for generating character image for a given character

# importing necessary libraries
from optimum.intel import OVLatentConsistencyModelPipeline

# model id for the cover image generation model
model_id = "OpenVINO/LCM_Dreamshaper_v7-int8-ov"
pipeline = OVLatentConsistencyModelPipeline.from_pretrained(model_id)

# function to generate a character image for the given character
# character_name: str, name of the character
# character_description: str, description of the character
# character_age: int, age of the character
# character_gender: str, gender of the character
# returns: list, generated character image for the given character
def generate_character_image(character_name, character_description, character_age, character_gender):
    prompt = f"Generate a character image for the character with name: {character_name}, description: {character_description}, age: {character_age}, gender: {character_gender}"
    images = pipeline(prompt, num_inference_steps=4).images
    return images