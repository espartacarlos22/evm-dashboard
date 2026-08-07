from fastapi import FastAPI

from app.api.router import api_router


app = FastAPI(
    title="EVM Dashboard API",
    description="API para gestión de proyectos y cálculo de Earned Value Management",
    version="1.0.0"
)


app.include_router(api_router)


@app.get("/")
def root():
    return {
        "message": "Bienvenido a la API EVM Dashboard"
    }