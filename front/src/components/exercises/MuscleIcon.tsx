import type { MuscleGroupType } from "@/dtos/muscle.dto";

type Props = {
  group: MuscleGroupType;
  className?: string;
};

const MuscleIcon = ({ group, className = "w-8 h-8 object-contain" }: Props) => {
  const src = new URL(`../../assets/muscles/${group}.png`, import.meta.url)
    .href;
  return <img src={src} alt="" className={className} />;
};

export default MuscleIcon;
