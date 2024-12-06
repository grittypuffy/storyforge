from fastapi import FastAPI
from .middleware import cors

app = FastAPI()
app = cors.cors_layer(app)