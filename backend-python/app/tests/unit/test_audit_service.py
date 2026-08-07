from uuid import uuid4
from unittest.mock import Mock, patch

from app.models.audit_log import AuditAction, AuditLog
from app.services import audit_service


def test_create_audit_log():
    db = Mock()

    entity_id = uuid4()

    audit_log = AuditLog(
        id=uuid4(),
        entity="Project",
        entity_id=entity_id,
        action=AuditAction.CREATE,
        description="Proyecto creado",
    )

    with patch(
        "app.services.audit_service.audit_repository.create",
        return_value=audit_log,
    ) as repository_create:

        result = audit_service.create_audit_log(
            db=db,
            entity="Project",
            entity_id=entity_id,
            action=AuditAction.CREATE,
            description="Proyecto creado",
        )

    assert result is audit_log

    repository_create.assert_called_once()

    created_log = repository_create.call_args.args[1]

    assert created_log.entity == "Project"
    assert created_log.entity_id == entity_id
    assert created_log.action == AuditAction.CREATE
    assert created_log.description == "Proyecto creado"


def test_get_audit_logs():
    db = Mock()

    logs = [
        AuditLog(
            id=uuid4(),
            entity="Project",
            entity_id=uuid4(),
            action=AuditAction.CREATE,
        )
    ]

    with patch(
        "app.services.audit_service.audit_repository.get_all",
        return_value=logs,
    ) as repository_get_all:

        result = audit_service.get_audit_logs(db)

    assert result == logs

    repository_get_all.assert_called_once_with(db)


def test_get_audit_log():
    db = Mock()

    audit_id = uuid4()

    audit_log = AuditLog(
        id=audit_id,
        entity="Project",
        entity_id=uuid4(),
        action=AuditAction.UPDATE,
    )

    with patch(
        "app.services.audit_service.audit_repository.get_by_id",
        return_value=audit_log,
    ) as repository_get_by_id:

        result = audit_service.get_audit_log(
            db,
            audit_id,
        )

    assert result is audit_log

    repository_get_by_id.assert_called_once_with(
        db,
        audit_id,
    )


def test_get_entity_audit_logs():
    db = Mock()

    logs = [
        AuditLog(
            id=uuid4(),
            entity="Project",
            entity_id=uuid4(),
            action=AuditAction.CREATE,
        )
    ]

    with patch(
        "app.services.audit_service.audit_repository.get_by_entity",
        return_value=logs,
    ) as repository_get_by_entity:

        result = audit_service.get_entity_audit_logs(
            db,
            "Project",
        )

    assert result == logs

    repository_get_by_entity.assert_called_once_with(
        db,
        "Project",
    )


def test_get_record_audit_logs():
    db = Mock()

    entity_id = uuid4()

    logs = [
        AuditLog(
            id=uuid4(),
            entity="Activity",
            entity_id=entity_id,
            action=AuditAction.UPDATE,
        )
    ]

    with patch(
        "app.services.audit_service.audit_repository.get_by_entity_id",
        return_value=logs,
    ) as repository_get_by_entity_id:

        result = audit_service.get_record_audit_logs(
            db,
            entity_id,
        )

    assert result == logs

    repository_get_by_entity_id.assert_called_once_with(
        db,
        entity_id,
    )


def test_get_action_audit_logs():
    db = Mock()

    logs = [
        AuditLog(
            id=uuid4(),
            entity="Project",
            entity_id=uuid4(),
            action=AuditAction.DELETE,
        )
    ]

    with patch(
        "app.services.audit_service.audit_repository.get_by_action",
        return_value=logs,
    ) as repository_get_by_action:

        result = audit_service.get_action_audit_logs(
            db,
            AuditAction.DELETE,
        )

    assert result == logs

    repository_get_by_action.assert_called_once_with(
        db,
        AuditAction.DELETE,
    )


def test_delete_audit_log():
    db = Mock()

    audit_log = AuditLog(
        id=uuid4(),
        entity="Project",
        entity_id=uuid4(),
        action=AuditAction.DELETE,
    )

    with patch(
        "app.services.audit_service.audit_repository.delete"
    ) as repository_delete:

        result = audit_service.delete_audit_log(
            db,
            audit_log,
        )

    assert result is None

    repository_delete.assert_called_once_with(
        db,
        audit_log,
    )