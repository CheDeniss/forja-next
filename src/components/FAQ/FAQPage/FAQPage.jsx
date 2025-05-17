'use client';
import React, {useEffect, useRef, useState} from 'react';
import styles from './FAQPage.module.scss';
import Menu from '@/components/FAQ/FAQPage/Menu/Menu.jsx'
import FAQSection from "@/components/FAQ/FAQPage/FAQSection/FAQSection.jsx";
import stylesNav from "@/components/Navigation/Navigation.module.scss";

const getSectionName = (order) => {
    if (order >= 100 && order < 200) return 'General Questions';
    if (order >= 200 && order < 300) return 'Registration & Login';
    if (order >= 300 && order < 400) return 'Account Settings';
    if (order >= 400 && order < 500) return 'Security & Privacy';
    if (order >= 500 && order < 600) return 'Library & Games';
    if (order >= 600 && order < 700) return 'Game Pages & Content';
    if (order >= 700 && order < 800) return 'Purchasing & Payments';
    if (order >= 800 && order < 900) return 'Game Issues & Technical Support';
    if (order >= 900 && order < 1000) return 'Community';
    if (order >= 1000 && order < 1100) return 'Tickets and Support';
    return 'Other';
};

export default function FAQPage({ faqs }) {
    const sectionRefs = useRef({});
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            const scrollTop = document.documentElement.scrollTop;
            const shouldBeScrolled = scrollTop > 95;

            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setIsScrolled(prev => {
                        if (prev !== shouldBeScrolled) {
                            return shouldBeScrolled;
                        }
                        return prev;
                    });
                    ticking = false;
                });

                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    const groupedFaqs = faqs.reduce((acc, faq) => {
        const section = getSectionName(faq.order);
        if (!acc[section]) acc[section] = [];
        acc[section].push(faq);
        return acc;
    }, {});

    const handleScrollTo = (section) => {
        sectionRefs.current[section]?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className={`${styles.container} ${isScrolled ? styles.scrolled : ""}`}>
            <div className={styles.left}>
                {Object.entries(groupedFaqs).map(([section, items]) => (
                    <div key={section} ref={(el) => sectionRefs.current[section] = el}>
                        <FAQSection title={section} faqs={items} />
                    </div>
                ))}
            </div>
            <div className={styles.right}>
                <Menu sections={Object.keys(groupedFaqs)} onSelect={handleScrollTo} />
            </div>
        </div>
    );
}
