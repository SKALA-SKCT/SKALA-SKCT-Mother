type Props = {
  height?: number;
};

const heightClassName = {
  20: {
    mark: "h-5 gap-1.5",
    text: "text-[17px]",
  },
  26: {
    mark: "h-[26px] gap-2",
    text: "text-[22px]",
  },
} as const;

export default function BrandMark({ height = 20 }: Props) {
  const classes = heightClassName[height as keyof typeof heightClassName] ?? heightClassName[20];

  return (
    <span className={`inline-flex items-center ${classes.mark}`}>
      <img className="h-full w-auto" src="/assets/sk-logo.svg" alt="SK" />
      <span className={`whitespace-nowrap font-bold leading-none text-ink ${classes.text}`}>
        SKALA-SKCT
      </span>
    </span>
  );
}
