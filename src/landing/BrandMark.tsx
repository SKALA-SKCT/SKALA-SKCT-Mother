type Props = {
  height?: number;
};

export default function BrandMark({ height = 20 }: Props) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: Math.round(height * 0.32) }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/assets/sk-logo.svg" alt="SK" height={height} style={{ width: "auto" }} />
      <span
        style={{
          color: "var(--ink)",
          fontSize: Math.round(height * 0.86),
          lineHeight: 1,
          letterSpacing: "-0.04em",
          fontWeight: 700,
          whiteSpace: "nowrap",
        }}
      >
        SKALA-SKCT
      </span>
    </span>
  );
}
