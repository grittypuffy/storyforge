# service to generate descriptions for the characters in the story

# importing necessary libraries
from transformers import AutoTokenizer
from optimum.intel.openvino import OVModelForCausalLM

# model id for the text generation model
model_id = "OpenVINO/Phi-3-mini-128k-instruct-int8-ov"
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = OVModelForCausalLM.from_pretrained(model_id)

# function to generate descriptions for the characters in the story
# story: str, story for which character descriptions are to be generated
# characters_list: list, list of characters for which descriptions are to be generated
# returns: list, generated descriptions for the characters in the story
def generate_character_descriptions(story, characters_list):
    prompt = f"Generate descriptions for the characters in the story: {story} with their respective names are as follows: {characters_list}."
    inputs = tokenizer(prompt, return_tensors="pt")
    outputs = model.generate(**inputs, max_length=len(characters_list) * 10)
    descriptions = tokenizer.batch_decode(outputs)[0].split("\n")
    return descriptions