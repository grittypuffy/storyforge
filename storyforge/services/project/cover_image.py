# Service for generating cover image for a given story

# importing necessary libraries
from optimum.intel import OVLatentConsistencyModelPipeline

# model id for the cover image generation model
model_id = "OpenVINO/LCM_Dreamshaper_v7-int8-ov"
pipeline = OVLatentConsistencyModelPipeline.from_pretrained(model_id)

# function to generate a cover image for the given story
# story_title: str, title of the story
# story_genre: str, genre of the story
# story_description: str, description of the story
# returns: list, generated cover image for the given story
def generate_cover_image(story_title, story_genre, story_description):
    prompt = f"Generate a cover image for the story with title: {story_title}, genre: {story_genre} and description: {story_description}"
    images = pipeline(prompt, num_inference_steps=4).images
    return images

