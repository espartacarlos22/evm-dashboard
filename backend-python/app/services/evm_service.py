from app.models.activity import Activity
from app.schemas.evm import EVMResponse


def calculate_evm(activity: Activity) -> EVMResponse:

    bac = float(activity.bac)
    planned_progress = float(activity.planned_progress)
    actual_progress = float(activity.actual_progress)
    ac = float(activity.actual_cost)

    pv = (planned_progress / 100) * bac
    ev = (actual_progress / 100) * bac

    cv = ev - ac
    sv = ev - pv

    cpi = None if ac == 0 else ev / ac
    spi = None if pv == 0 else ev / pv

    eac = None if cpi is None or cpi == 0 else bac / cpi
    vac = None if eac is None else bac - eac

    cpi_status = _get_cpi_status(cpi)
    spi_status = _get_spi_status(spi)

    return EVMResponse(
        activity_id=activity.id,
        bac=bac,
        pv=pv,
        ev=ev,
        ac=ac,
        cv=cv,
        sv=sv,
        cpi=cpi,
        spi=spi,
        eac=eac,
        vac=vac,
        cpi_status=cpi_status,
        spi_status=spi_status,
    )


def _get_cpi_status(cpi: float | None) -> str:

    if cpi is None:
        return "UNDEFINED"

    if cpi > 1:
        return "UNDER_BUDGET"

    if cpi < 1:
        return "OVER_BUDGET"

    return "ON_BUDGET"


def _get_spi_status(spi: float | None) -> str:

    if spi is None:
        return "UNDEFINED"

    if spi > 1:
        return "AHEAD_OF_SCHEDULE"

    if spi < 1:
        return "BEHIND_SCHEDULE"

    return "ON_SCHEDULE"