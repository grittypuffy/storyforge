from fastapi import FastAPI
from storyforge.middleware import cors
from storyforge.routes.character import character_router
from storyforge.routes.project import project_router
from storyforge.routes.story import story_router

app = FastAPI()
app = cors.cors_layer(app)
app.include_router(character_router, prefix="/character")
app.include_router(project_router, prefix="/project")
app.include_router(story_router, prefix="/story")