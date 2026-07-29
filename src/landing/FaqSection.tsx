"use client";

import type { CSSProperties } from "react";
import { useId, useState } from "react";
import { faqs } from "./content";
import styles from "./FaqSection.module.css";

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section className={styles.section}>
      <div className={styles.panel}>
        <div className={styles.content}>
          <h2 className={`heading ${styles.title}`}>
            자주 묻는 질문
          </h2>

          <div className={styles.list}>
            {faqs.map((faq, index) => {
              const isOpen = open === index;
              const panelId = `${baseId}-panel-${index}`;

              return (
                <div
                  className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}
                  style={{ "--faq-delay": `${index * 80}ms` } as CSSProperties}
                  key={faq.q}
                >
                  <button
                    type="button"
                    className={styles.trigger}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : index)}
                  >
                    {faq.q}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`}
                      src="/assets/faq-icon.svg"
                      alt=""
                      width={24}
                      height={25}
                    />
                  </button>

                  <div
                    id={panelId}
                    className={styles.answer}
                    aria-hidden={!isOpen}
                  >
                    <p>{faq.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
