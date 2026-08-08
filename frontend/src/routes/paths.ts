export const rootPaths = {
  homeRoot: '/',
  authRoot: 'autenticacion',
  arbitrajeRoot: 'arbitraje',
  arbitrajeAutomatico: 'automatico',
  arbolReferidos: 'equipo',
  seguridadRoot: 'seguridad',  
  soporteRoot: 'soporte',  
  billeteraRoot: 'billetera',
  gananciasRoot: 'ganancias', // 👈 NUEVO módulo para ganancias
  adminRoot: 'administrador', // 👈 NUEVO módulo para administración
  errorRoot: 'error',
}

export default {
  home: `/${rootPaths.homeRoot}`,
  login: `/${rootPaths.authRoot}/ingreso`,
  signup: `/${rootPaths.authRoot}/registro`,
  autenticador: `/${rootPaths.authRoot}/token2FA`,
  operation: `/${rootPaths.arbitrajeRoot}/operacion`,
  automatico: `/${rootPaths.arbitrajeAutomatico}/operacion`,
  arbolReferidos: `/${rootPaths.arbolReferidos}/red-aliados`,
  seguridad: `/${rootPaths.seguridadRoot}/configuracion`, // 👈 ruta para seguridad
  soporte: `/${rootPaths.soporteRoot}/soporte`, // 👈 ruta para soporte
  billetera: `/${rootPaths.billeteraRoot}/operaciones`, // 👈 ruta única para billetera
  misGanancias: `/${rootPaths.gananciasRoot}/mis-ganancias`, // 👈 NUEVA ruta para Mis ganancias
  adminpanel : `/${rootPaths.adminRoot}/panel`, // 👈 NUEVA ruta para el panel de administración
  404: `/${rootPaths.errorRoot}/404`,
}