import type { CSSProperties } from "react";
import { workflow } from "./content";
import styles from "./WorkflowSection.module.css";

export default function WorkflowSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={`heading reveal ${styles.title}`}>{workflow.title}</h2>

        <div className={styles.grid}>
          {workflow.steps.map((step, index) => (
            <article
              className={`reveal ${styles.step}`}
              style={{ "--reveal-y": "72px", "--reveal-delay": `${index * 80}ms` } as CSSProperties}
              key={`${index}-${step.title}`}
            >
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
