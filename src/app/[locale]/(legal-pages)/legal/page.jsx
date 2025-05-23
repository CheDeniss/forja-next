import styles from '../LegalPages.module.scss'

export default function LegalNoticePage() {
    return (
        <div className={styles.container}>
            <span>Legal Notice</span>
            <p>Forja is operated by [Company Name], registered in [Country], under number [Company Registration
                Number].</p>
            <p>Contact:<br/>Email: [your email]<br/>Address: [Company address]</p>
            <p>All content on this site is the property of Forja or its licensors and may not be reproduced without permission.</p>
        </div>
    );
}
