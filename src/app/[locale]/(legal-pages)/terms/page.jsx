import styles from '../LegalPages.module.scss'

export default function TermsOfServicePage() {
    return (
        <div className={styles.container}>
            <span>Terms of Service</span>
            <p>By using Forja, you agree to abide by these terms. You must not misuse the service or engage in any activity that may harm Forja or its users.</p>

            <p>We reserve the right to suspend or terminate accounts that violate our rules.</p>

            <p>These terms are governed by the laws of [Jurisdiction]. Contact us if you have questions.</p>
        </div>
    );
}
