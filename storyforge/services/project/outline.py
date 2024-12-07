# service to generate the outline for the given story

# importing necessary libraries
from transformers import AutoTokenizer
from optimum.intel.openvino import OVModelForCausalLM

# model id for the text generation model
model_id = "OpenVINO/Phi-3-mini-128k-instruct-int8-ov"
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = OVModelForCausalLM.from_pretrained(model_id)

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