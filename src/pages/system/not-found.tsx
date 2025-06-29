import NotFound from '@/components/shared/handler/not-found'

// 404
export default function NotFoundPage() {
  return (
    <div className="flex-1 flex items-center justify-center bg-muted px-4">
      <NotFound />
    </div>
  )
}
