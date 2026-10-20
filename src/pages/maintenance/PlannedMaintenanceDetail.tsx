import { Link } from 'react-router-dom'
import { useI18n } from '@/i18n'
import { Button, PageHeader } from '@/components/ui/primitives'
import { MaintenanceList } from '@/components/maintenance/MaintenanceList'

/** Planned maintenance list + detail modal (edit / advance status / delete). */
export default function PlannedMaintenanceDetail() {
  const { t } = useI18n()
  return (
    <div>
      <PageHeader
        title={t.pm.detailTitle}
        subtitle={t.pm.detailSubtitle}
        actions={
          <Link to="/maintenance/planned/new">
            <Button>{t.pm.createTitle}</Button>
          </Link>
        }
      />
      <MaintenanceList kind="planned" />
    </div>
  )
}
