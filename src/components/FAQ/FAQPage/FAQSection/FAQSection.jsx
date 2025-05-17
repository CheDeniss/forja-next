import styles from './FAQSection.module.scss';

export default function FAQSection({ title, faqs }) {
    return (
        <section className={styles.section}>
            <h2>{title}</h2>
            {faqs.map(({ id, question, answer }) => (
                <div key={id} className={styles.qaItem}>
                    <h3>{question}</h3>
                    <p>{answer}</p>
                </div>
            ))}
        </section>
    );
}
