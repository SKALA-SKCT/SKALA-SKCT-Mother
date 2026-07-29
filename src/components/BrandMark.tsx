type Props = {
  height?: number;
};

export default function BrandMark({ height = 20 }: Props) {
  return (
    <span className="brand-mark" style={{ gap: Math.round(height * 0.32) }}>
      <img src="/assets/sk-logo.svg" alt="SK" height={height} />
      <span style={{ fontSize: Math.round(height * 0.86) }}>SKALA-SKCT</span>
    </span>
  );
}
