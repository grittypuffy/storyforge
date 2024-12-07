# service to suggest names for the characters in the story

# importing necessary libraries
from transformers import AutoTokenizer
from optimum.intel.openvino import OVModelForCausalLM

# model id for the text generation model
model_id = "OpenVINO/Phi-3-mini-128k-instruct-int8-ov"
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = OVModelForCausalLM.from_pretrained(model_id)

# function to suggest names for the characters in the story
# character_count: int, number of characters for which names are to be suggested
# genders_list: list, list of male / female / non binary representations of the characters which is the same length as character_count
# nationality_list: list, list of nationalities of the characters which is the same length as character_count
# returns: list, generated names for the characters in the story
def suggest_character_names(character_count, genders_list, nationality_list):
    prompt = f"Generate names for the {character_count} number of characters in the story with their respective genders and nationalities are as follows: {genders_list} and {nationality_list}."
    inputs = tokenizer(prompt, return_tensors="pt")
    outputs = model.generate(**inputs, max_length=character_count * 10)
    names = tokenizer.batch_decode(outputs)[0].split("\n")
    return names