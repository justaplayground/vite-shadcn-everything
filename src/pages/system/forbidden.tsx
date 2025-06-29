import Forbidden from '@/components/shared/handler/forbidden'

// 403
export default function ForbiddenPage() {
  return (
    <div className="flex-1 flex items-center justify-center overflow-hidden bg-muted px-4">
      <Forbidden />
    </div>
  )
}
