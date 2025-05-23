import styles from '../LegalPages.module.scss'

export default function CookieSettingsPage() {
    return (
        <div className={styles.container}>
            <span>Rules</span>
            <h1>FORJA COMMUNITY PLATFORM RULES</h1>

            <h2 style={{marginTop: "32px"}}>GENERAL PROVISIONS</h2>
            <p>
                The Forja community exists to foster respectful communication, idea exchange, and player support.
                To keep this space safe and welcoming, please follow these rules.
            </p>

            <h2 style={{marginTop: "32px"}}>WHAT’S NOT ALLOWED</h2>
            <ul>
                <li><strong>Insults & Toxic Behavior:</strong> No threats, discrimination, harassment, or disrespectful
                    conduct.
                </li>
                <li><strong>Spam & Unapproved Ads:</strong> Promoting products or services without prior approval is not
                    permitted.
                </li>
                <li><strong>Flooding & Trolling:</strong> Don’t derail conversations with spam, provocation, or
                    irrelevant content.
                </li>
                <li><strong>Copyright Violations:</strong> Uploading pirated software, keys, or any illegal material is
                    forbidden.
                </li>
                <li><strong>Fraud & Impersonation:</strong> Pretending to be another user or Forja staff is a serious
                    violation.
                </li>
                <li><strong>Prohibited Topics:</strong> No discussion of violence, extremism, drugs, or similar content.
                </li>
            </ul>

            <h2 style={{marginTop: "32px"}}>IF YOU BREAK THE RULES</h2>
            <p>Depending on the situation, the following actions may be taken:</p>
            <ul>
                <li>Message removal</li>
                <li>Temporary or permanent account suspension</li>
                <li>Restrictions on platform features</li>
            </ul>

            <h2 style={{marginTop: "32px"}}>REPORTING & APPEALS</h2>
            <ul>
                <li>Use the Report button or make a ticket to flag inappropriate content or behavior</li>
                <li>For complex cases, reach out to support</li>
                <li>If your account is blocked, you can submit an appeal via the form on our website</li>
            </ul>

            <h2 style={{marginTop: "32px"}}>RULE UPDATES</h2>
            <p>
                We may update these rules from time to time. Significant changes will be announced,
                so please check the Community Rules page regularly.
            </p>
        </div>
    );
}
