from fastapi import APIRouter

router = APIRouter()


@router.get(
    "/health",
    summary="Health Check",
    description="Verifica que la API está funcionando."
)
def health_check():
    return {
        "status": "OK",
        "message": "API funcionando correctamente"
    }