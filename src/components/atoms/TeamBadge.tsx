import Image from "next/image";

interface TeamBadgeProps {
  name: string;
  flagUrl: string;
}

export function TeamBadge({ name, flagUrl }: TeamBadgeProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-6 h-6 rounded-full overflow-hidden relative border border-gray-600">
        <Image src={flagUrl} alt={`${name} flag`} fill className="object-cover" />
      </div>
      <span className="font-medium text-sm text-gray-200">{name}</span>
    </div>
  );
}