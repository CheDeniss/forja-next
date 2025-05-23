import styles from '../LegalPages.module.scss'
import CustomButtonOther from "@/components/ui/CustomButtonOther/CustomButtonOther.jsx";

export default function PrivacyPolicyPage() {

    return (
        <div className={styles.container} >
            <span>PRIVACY POLICY</span>
            <div style={{fontFamily: "Fixel Display"}}>
                <p>Your data, your rules — we’re just here to build something better for you.</p>

                <h2 style={{marginTop: "32px"}}>What We Collect</h2>
                <p>We only collect what’s necessary to provide and improve Forja:</p>
                <ul>
                    <li>Name (if provided)</li>
                    <li>Email address (if you register)</li>
                    <li>Usage data (how you use the site)</li>
                    <li>Cookies (just the digital kind)</li>
                </ul>

                <h2 style={{marginTop: "32px"}}>How We Use It</h2>
                <p>We use this data to:</p>
                <ul>
                    <li>Deliver and improve Forja's features</li>
                    <li>Keep your account secure</li>
                    <li>Understand what’s working (via analytics)</li>
                </ul>

                <h2 style={{marginTop: "32px"}}>Who Has Access</h2>
                <p>
                    Only us. We never sell or share your data with third parties — unless required by law.
                </p>

                <h2 style={{marginTop: "32px"}}>Your Rights</h2>
                <p>You can:</p>
                <ul>
                    <li>Access your data</li>
                    <li>Modify or delete it</li>
                    <li>Contact us any time at [your contact email]</li>
                </ul>

                <h2 style={{marginTop: "32px"}}>Stay In Control</h2>
                <p>You're always in charge of your info. We just help you make the most of it.</p>
            </div>

            <p style={{fontSize: "0.8em", color: "#aaa", marginTop: "40px"}}>
                Last updated: [{new Date().toLocaleDateString('en-GB')}]
            </p>
        </div>
    );
}
