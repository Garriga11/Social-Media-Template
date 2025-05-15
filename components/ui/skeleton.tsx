// components/ui/skeleton.tsx
export function DashboardSkeleton() {
    return (
        <div className="flex items-center gap-4 border p-4 rounded-md animate-pulse bg-muted/20">
            <div className="w-12 h-12 rounded-full bg-muted" />
            <div className="space-y-2">
                <div className="w-40 h-4 bg-muted rounded" />
                <div className="w-28 h-4 bg-muted rounded" />
            </div>
        </div>
    )
}
