from fastapi import APIRouter

from app.api.routes.health import router as health_router
from app.api.routes.database import router as database_router
from app.api.routes.projects import router as projects_router
from app.api.routes.activities import router as activities_router
from app.api.routes.audit import router as audit_router
from app.api.routes.evm import router as evm_router


api_router = APIRouter()


api_router.include_router(
    health_router,
    tags=["Health"],
)


api_router.include_router(
    database_router,
    tags=["Database"],
)


api_router.include_router(
    activities_router,
    prefix="/activities",
    tags=["Activities"],
)


api_router.include_router(
    audit_router,
    prefix="/audit",
    tags=["Audit"],
)


api_router.include_router(
    projects_router,
    tags=["Projects"],
)


api_router.include_router(
    evm_router,
    prefix="/projects",
    tags=["EVM"],
)