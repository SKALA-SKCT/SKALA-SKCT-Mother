import { partners } from "./content";

export default function LogoMarquee() {
  // Duplicated so the -50% keyframe loops seamlessly.
  const loop = [...partners, ...partners, ...partners, ...partners];

  return (
    <section className="pb-[96px] pt-[84px] text-center">
      <p className="mb-12 text-[18px] leading-[1.7] tracking-[-0.5px] text-muted">
        SK 주요 계열사 지원 준비 흐름에 맞춰 SKCT를 학습해요
      </p>
      <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div className="flex w-max animate-marquee gap-[88px] motion-reduce:animate-none">
          {loop.map((partner, index) => (
            <div
              className="inline-flex flex-none items-center gap-3 whitespace-nowrap text-[26px] font-bold leading-none tracking-[-1px] text-ink"
              key={`${partner.name}-${index}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="h-6 w-auto flex-none object-contain"
                src={partner.logo}
                alt=""
                width={partner.width}
                height={partner.height}
              />
              <span>{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
