from uuid import UUID

from sqlalchemy.orm import Session

from app.models.audit_log import AuditLog, AuditAction


def create(
    db: Session,
    audit_log: AuditLog,
) -> AuditLog:
    db.add(audit_log)
    db.commit()
    db.refresh(audit_log)

    return audit_log


def get_all(
    db: Session,
) -> list[AuditLog]:
    return (
        db.query(AuditLog)
        .order_by(AuditLog.created_at.desc())
        .all()
    )


def get_by_id(
    db: Session,
    audit_id: UUID,
) -> AuditLog | None:
    return (
        db.query(AuditLog)
        .filter(AuditLog.id == audit_id)
        .first()
    )


def get_by_entity(
    db: Session,
    entity: str,
) -> list[AuditLog]:
    return (
        db.query(AuditLog)
        .filter(AuditLog.entity == entity)
        .order_by(AuditLog.created_at.desc())
        .all()
    )


def get_by_entity_id(
    db: Session,
    entity_id: UUID,
) -> list[AuditLog]:
    return (
        db.query(AuditLog)
        .filter(AuditLog.entity_id == entity_id)
        .order_by(AuditLog.created_at.desc())
        .all()
    )


def get_by_action(
    db: Session,
    action: AuditAction,
) -> list[AuditLog]:
    return (
        db.query(AuditLog)
        .filter(AuditLog.action == action)
        .order_by(AuditLog.created_at.desc())
        .all()
    )


def delete(
    db: Session,
    audit_log: AuditLog,
) -> None:
    db.delete(audit_log)
    db.commit()