# service to generate the synopsis for the given story

# importing necessary libraries
from transformers import AutoTokenizer
from optimum.intel.openvino import OVModelForCausalLM

# model id for the text generation model
model_id = "OpenVINO/Phi-3-mini-128k-instruct-int8-ov"
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = OVModelForCausalLM.from_pretrained(model_id)

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