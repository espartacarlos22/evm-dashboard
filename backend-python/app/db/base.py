from app.db.database import Base

# Importar todos los modelos para que Alembic los detecte

from app.models.project import Project
from app.models.activity import Activity
from app.models.audit_log import AuditLog