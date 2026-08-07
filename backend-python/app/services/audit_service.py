from uuid import UUID

from sqlalchemy.orm import Session

from app.models.audit_log import AuditLog, AuditAction
from app.repositories import audit_repository


def create_audit_log(
    db: Session,
    entity: str,
    entity_id: UUID,
    action: AuditAction,
    description: str | None = None,
) -> AuditLog:

    audit_log = AuditLog(
        entity=entity,
        entity_id=entity_id,
        action=action,
        description=description,
    )

    return audit_repository.create(
        db,
        audit_log,
    )


def get_audit_logs(
    db: Session,
) -> list[AuditLog]:

    return audit_repository.get_all(db)


def get_audit_log(
    db: Session,
    audit_id: UUID,
) -> AuditLog | None:

    return audit_repository.get_by_id(
        db,
        audit_id,
    )


def get_entity_audit_logs(
    db: Session,
    entity: str,
) -> list[AuditLog]:

    return audit_repository.get_by_entity(
        db,
        entity,
    )


def get_record_audit_logs(
    db: Session,
    entity_id: UUID,
) -> list[AuditLog]:

    return audit_repository.get_by_entity_id(
        db,
        entity_id,
    )


def get_action_audit_logs(
    db: Session,
    action: AuditAction,
) -> list[AuditLog]:

    return audit_repository.get_by_action(
        db,
        action,
    )


def delete_audit_log(
    db: Session,
    audit_log: AuditLog,
) -> None:

    audit_repository.delete(
        db,
        audit_log,
    )