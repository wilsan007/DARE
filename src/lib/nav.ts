import {
  BarChart3,
  Cable,
  CalendarClock,
  CalendarPlus,
  CalendarRange,
  ClipboardList,
  Database,
  FilePlus2,
  FolderOpen,
  Gauge,
  Layers,
  Network,
  Pencil,
  Rocket,
  Search,
  Send,
  Ticket,
  Users,
  type LucideIcon,
} from 'lucide-react'
import type { Translations } from '@/i18n'

export interface NavItem {
  path: string
  labelKey: keyof Translations['nav']
  icon: LucideIcon
}

export interface NavGroup {
  labelKey: keyof Translations['nav']
  icon: LucideIcon
  /** First child path — used as the group landing route. */
  basePath: string
  children: NavItem[]
}

export const capacityItems: NavItem[] = [
  { path: '/capacity', labelKey: 'capacityEntitlements', icon: Database },
  { path: '/mux', labelKey: 'muxPlan', icon: Layers },
  { path: '/circuits', labelKey: 'circuitSearch', icon: Search },
  { path: '/request', labelKey: 'circuitRequest', icon: Send },
  { path: '/workorders', labelKey: 'workOrders', icon: ClipboardList },
  { path: '/modify', labelKey: 'modifyCircuit', icon: Pencil },
]

export const mainItems: NavItem[] = [{ path: '/', labelKey: 'dashboard', icon: Gauge }]

export const maintenanceGroups: NavGroup[] = [
  {
    labelKey: 'troubleTicket',
    icon: Ticket,
    basePath: '/maintenance/trouble/new',
    children: [
      { path: '/maintenance/trouble/new', labelKey: 'createTroubleTicket', icon: FilePlus2 },
      { path: '/maintenance/trouble', labelKey: 'troubleTicketDetail', icon: Ticket },
    ],
  },
  {
    labelKey: 'plannedMaintenance',
    icon: CalendarPlus,
    basePath: '/maintenance/planned/new',
    children: [
      { path: '/maintenance/planned/new', labelKey: 'createPlannedMaintenance', icon: FilePlus2 },
      { path: '/maintenance/planned', labelKey: 'plannedMaintenanceDetail', icon: CalendarClock },
    ],
  },
  {
    labelKey: 'schedules',
    icon: CalendarRange,
    basePath: '/maintenance/schedules',
    children: [{ path: '/maintenance/schedules', labelKey: 'schedules', icon: CalendarRange }],
  },
]

export const secondaryItems: NavItem[] = [
  { path: '/reports', labelKey: 'reports', icon: BarChart3 },
  { path: '/documents', labelKey: 'documents', icon: FolderOpen },
  { path: '/users', labelKey: 'users', icon: Users },
  { path: '/providers', labelKey: 'providers', icon: Cable },
  { path: '/diagram', labelKey: 'diagram', icon: Network },
  { path: '/project', labelKey: 'project', icon: Rocket },
]

export function findNavItem(pathname: string): NavItem | undefined {
  const flat: NavItem[] = [
    ...mainItems,
    ...capacityItems,
    ...maintenanceGroups.flatMap((g) => g.children),
    ...secondaryItems,
  ]
  if (pathname === '/') return flat[0]
  // Longest-prefix match so child routes resolve to their own label.
  let best: NavItem | undefined
  for (const item of flat) {
    if (item.path === '/') continue
    if (pathname === item.path || pathname.startsWith(`${item.path}/`)) {
      if (!best || item.path.length > best.path.length) best = item
    }
  }
  return best
}

/** Maintenance section header shown in the Topbar when the Reports Documents … list does not own the label. */
export function isMaintenancePath(pathname: string): boolean {
  return pathname.startsWith('/maintenance')
}

export function findMaintenanceGroup(pathname: string): NavGroup | undefined {
  return maintenanceGroups.find((g) => pathname.startsWith(g.basePath.split('/').slice(0, 3).join('/')) && g.children.some((c) => pathname === c.path || pathname.startsWith(`${c.path}/`)))
}
