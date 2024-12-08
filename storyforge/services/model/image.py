# importing necessary libraries
from optimum.intel import OVLatentConsistencyModelPipeline

# model id for the cover image generation model
model_id = "OpenVINO/LCM_Dreamshaper_v7-int8-ov"
pipeline = OVLatentConsistencyModelPipeline.from_pretrained(model_id)