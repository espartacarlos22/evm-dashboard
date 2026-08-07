from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.audit_log import AuditAction
from app.schemas.audit import AuditLogResponse
from app.services import audit_service


router = APIRouter()


@router.get(
    "/",
    response_model=list[AuditLogResponse],
)
def get_audit_logs(
    db: Session = Depends(get_db),
):
    return audit_service.get_audit_logs(db)


@router.get(
    "/{audit_id}",
    response_model=AuditLogResponse,
)
def get_audit_log(
    audit_id: UUID,
    db: Session = Depends(get_db),
):
    audit_log = audit_service.get_audit_log(
        db,
        audit_id,
    )

    if audit_log is None:
        raise HTTPException(
            status_code=404,
            detail="Registro de auditoría no encontrado",
        )

    return audit_log


@router.get(
    "/entity/{entity}",
    response_model=list[AuditLogResponse],
)
def get_entity_audit_logs(
    entity: str,
    db: Session = Depends(get_db),
):
    return audit_service.get_entity_audit_logs(
        db,
        entity,
    )


@router.get(
    "/entity-id/{entity_id}",
    response_model=list[AuditLogResponse],
)
def get_record_audit_logs(
    entity_id: UUID,
    db: Session = Depends(get_db),
):
    return audit_service.get_record_audit_logs(
        db,
        entity_id,
    )


@router.get(
    "/action/{action}",
    response_model=list[AuditLogResponse],
)
def get_action_audit_logs(
    action: AuditAction,
    db: Session = Depends(get_db),
):
    return audit_service.get_action_audit_logs(
        db,
        action,
    )