import Image from "next/image";

interface TeamBadgeProps {
  name: string;
  flagUrl: string;
}

export function TeamBadge({ name, flagUrl }: TeamBadgeProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="overflow-hidden relative">
        <Image 
        src={flagUrl} 
        alt={`${name} flag`} 
        width={28}
        height={28} 
        className="object-cover w-full h-full" />
      </div>
      <span className="font-medium text-sm text-[#F5F2FF]">{name}</span>
    </div>
  );
}