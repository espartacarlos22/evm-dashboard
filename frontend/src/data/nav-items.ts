export interface NavItem {
  id: number;
  path: string;
  label: string;
  title: string;
  icon: string;
  active: boolean;
  rol: any;
}

const navItems: NavItem[] = [
  /*
  {
    id: 1,
    label: '',
    path: '/',
    title: 'Dashboard',
    icon: 'mingcute:home-1-fill',
    active: true,
    rol: ["Admin", "Soporte", "User"]
  },
  */
  {
    id: 2,
    label: '',
    path: '/arbitraje/operacion',
    title: "textoOpcionArbitrajeManualSidebar", // Opción de Arbitraje Manual
    icon: 'mage:rocket-fill',
    active: true,
    rol: ["Admin", "Soporte", "User"]
  },
  {
    id: 3,
    label: '',
    path: '/automatico/operacion',
    title: 'textoOpcionArbitrajeAutomaticoSidebar', // Opción de Arbitraje Automático
    icon: 'mdi:robot-outline',
    active: true,
    rol: ["Admin", "Soporte", "User"]
  },
  {
    id: 4,
    label: '',
    path: '/billetera/operaciones',
    title: 'textoOpcionBilleteraSidebar',  // Opción de Billetera
    icon: 'mdi:wallet-outline',
    active: true,
    rol: ["Admin", "Soporte", "User"]
  },
  /*
  {
    id: 5,
    label: '',
    path: '/autenticacion/ingreso',
    title: 'Ingresar',
    icon: 'tabler:login',
    active: true,
    rol: ["Admin", "Soporte", "User"]
  },  
  {
    id: 6,
    label: '',
    path: '/autenticacion/registro',
    title: 'Registro',
    icon: 'tdesign:user-add',
    active: true,
    rol: ["Admin", "Soporte", "User"]
  },
  */
  {
    id: 7,
    label: '',
    path: '/ganancias/mis-ganancias',
    title: 'textoOpcionMisGananciasSidebar', // Opción de Mis ganancias
    icon: 'tabler:coins',
    active: true,
    rol: ["Admin", "Soporte", "User"]
  },
  {
    id: 8,
    label: '',
    path: '/equipo/red-aliados',
    title: 'textoOpcionRedAliadosSidebar', // Opción de Red aliados
    icon: 'tabler:users-group',
    active: true,
    rol: ["Admin", "Soporte", "User"]
  },
  {
    id: 9,
    label: '',
    path: '/seguridad/configuracion',
    title: 'textoOpcionSeguridadSidebar', // Opción de Seguridad
    icon: 'mdi:shield-lock', // ícono de seguridad representativo
    active: true,
    rol: ["Admin", "Soporte", "User"]
  },
  {
    id: 10,
    label: '',
    path: '/Soporte/soporte',
    title: 'textoOpcionSoporteSidebar', // Opción de Soporte
    icon: 'mdi-customer-service', // soporte representativo
    active: true,
    rol: ["Admin", "Soporte", "User"]
  },
  {
    id: 11,
    label: '',
    path: '/administrador/panel',
    title: 'Administración',
    icon: 'mdi:account-key', // ícono representativo para administración
    active: true,
    rol: ["Admin", "Soporte"]
  }
]

export default navItems;