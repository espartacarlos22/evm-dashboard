-- ============================================================
-- EVM DASHBOARD DATABASE
-- PostgreSQL / Supabase
-- Autor: Carlos Oviedo
-- ============================================================

-- ============================================================
-- EXTENSIONES
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- ENUMS
-- ============================================================

CREATE TYPE project_status AS ENUM (
    'PLANNING',
    'IN_PROGRESS',
    'COMPLETED',
    'CANCELLED'
);

-- ============================================================
-- TABLA PROJECTS
-- ============================================================

CREATE TABLE projects (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name VARCHAR(150) NOT NULL,

    description TEXT,

    status project_status NOT NULL DEFAULT 'PLANNING',

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- TABLA ACTIVITIES
-- ============================================================

CREATE TABLE activities (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    project_id UUID NOT NULL,

    name VARCHAR(150) NOT NULL,

    bac NUMERIC(12,2) NOT NULL,

    planned_progress NUMERIC(5,2) NOT NULL,

    actual_progress NUMERIC(5,2) NOT NULL,

    actual_cost NUMERIC(12,2) NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_project
        FOREIGN KEY(project_id)
        REFERENCES projects(id)
        ON DELETE CASCADE,

    CONSTRAINT chk_bac
        CHECK (bac > 0),

    CONSTRAINT chk_planned_progress
        CHECK (
            planned_progress >= 0
            AND planned_progress <= 100
        ),

    CONSTRAINT chk_actual_progress
        CHECK (
            actual_progress >= 0
            AND actual_progress <= 100
        ),

    CONSTRAINT chk_actual_cost
        CHECK (
            actual_cost >= 0
        )
);

-- ============================================================
-- TABLA AUDIT LOGS
-- ============================================================

CREATE TABLE audit_logs (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    entity VARCHAR(50) NOT NULL,

    entity_id UUID NOT NULL,

    action VARCHAR(50) NOT NULL,

    description TEXT,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- ÍNDICES
-- ============================================================

CREATE INDEX idx_projects_name
ON projects(name);

CREATE INDEX idx_activities_project
ON activities(project_id);

CREATE INDEX idx_activities_name
ON activities(name);

CREATE INDEX idx_audit_entity
ON audit_logs(entity);

-- ============================================================
-- TRIGGER PARA updated_at
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS
$$
BEGIN

    NEW.updated_at = CURRENT_TIMESTAMP;

    RETURN NEW;

END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER trg_projects_updated_at
BEFORE UPDATE
ON projects
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_activities_updated_at
BEFORE UPDATE
ON activities
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();