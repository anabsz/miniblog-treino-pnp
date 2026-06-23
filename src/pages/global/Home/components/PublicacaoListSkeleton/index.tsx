export default function PublicacaoListSkeleton(): React.ReactNode {
	return (
		<div className="br-card p-4">
			<div className="w-full h-48 bg-gray-200 animate-pulse rounded" />

			<div className="mt-4 h-8 bg-gray-200 animate-pulse rounded" />

			<div className="mt-2 h-4 bg-gray-200 animate-pulse rounded" />
			<div className="mt-2 h-4 bg-gray-200 animate-pulse rounded" />
			<div className="mt-2 h-4 bg-gray-200 animate-pulse rounded w-3/4" />

			<div className="mt-4 h-3 bg-gray-200 animate-pulse rounded w-1/2" />
			<div className="mt-2 h-3 bg-gray-200 animate-pulse rounded w-1/3" />
		</div>
	);
}
