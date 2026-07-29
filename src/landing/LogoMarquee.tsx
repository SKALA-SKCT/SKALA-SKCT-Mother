import { partners } from "./content";
import styles from "./LogoMarquee.module.css";

export default function LogoMarquee() {
  // Duplicated so the -50% keyframe loops seamlessly.
  const loop = [...partners, ...partners, ...partners, ...partners];

  return (
    <section className={styles.wrap}>
      <p className={styles.title}>SK 주요 계열사 지원 준비 흐름에 맞춰 SKCT를 학습해요</p>
      <div className={styles.mask}>
        <div className={styles.track}>
          {loop.map((partner, index) => (
            <div className={styles.partner} key={`${partner.name}-${index}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={styles.logo}
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
