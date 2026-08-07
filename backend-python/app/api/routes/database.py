from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.db.database import get_db

router = APIRouter()

@router.get(
    "/database",
    summary="Test Database",
    description="Verifica la conexión con PostgreSQL."
)
def test_database(db: Session = Depends(get_db)):

    result = db.execute(text("SELECT version();"))

    version = result.scalar()

    return {
        "status": "OK",
        "database": version
    }