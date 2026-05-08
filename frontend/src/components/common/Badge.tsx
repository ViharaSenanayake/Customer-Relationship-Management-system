interface BadgeProps {
  text: string;
  colors: { bg: string; text: string; border: string };
}

export const Badge = ({ text, colors }: BadgeProps) => {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${colors.bg} ${colors.text} ${colors.border}`}>
      {text}
    </span>
  );
};
