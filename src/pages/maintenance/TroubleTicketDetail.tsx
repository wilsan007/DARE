import { Link } from 'react-router-dom'
import { useI18n } from '@/i18n'
import { Button, PageHeader } from '@/components/ui/primitives'
import { MaintenanceList } from '@/components/maintenance/MaintenanceList'

/** Trouble ticket list + detail modal (edit / advance status / delete). */
export default function TroubleTicketDetail() {
  const { t } = useI18n()
  return (
    <div>
      <PageHeader
        title={t.tt.detailTitle}
        subtitle={t.tt.detailSubtitle}
        actions={
          <Link to="/maintenance/trouble/new">
            <Button>{t.tt.createTitle}</Button>
          </Link>
        }
      />
      <MaintenanceList kind="trouble" />
    </div>
  )
}
