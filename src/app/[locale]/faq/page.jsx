import FAQPage from "@/components/FAQ/FAQPage/FAQPage.jsx";
import {getAllFAQ} from "@/api/ServerServices/serverFetchServices.js";
import styles from "./Faq.module.scss";

export default async function FAQ({params}) {
    let faqs = [];
    const locale = await params;

    try {
        faqs = await getAllFAQ(locale);
    } catch (error) {
        console.error('Failed to fetch FAQs:', error);
    }

    if (!faqs || faqs.length === 0) {
        return (
            <div className={styles.container}>
                <span className="no_Items_Found">
                    There are no FAQs available at the moment.
                </span>
            </div>
        );
    }


    return (
        <div className={styles.container}>
            <FAQPage faqs={faqs} />
        </div>
    );
}
