'use client';

import {useSearchParams, useRouter, useParams} from 'next/navigation';
import React from 'react';
import AccordionSelector from '@/app/components/Profile/Settings/AccordionSelector/AccordionSelector.jsx';
import styles from './ProfileSettings.module.scss';
import GeneralSettings from "@/app/components/Profile/Settings/sections/GeneralSettings/GeneralSettings.jsx";
import {useAuth} from "@/context/AuthContext.js";

const SettingsPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const section = searchParams.get('section') || 'general';
    const { locale } = useParams();

    const handleSectionChange = (newSection) => {
        router.push(`/${locale}/profile/settings?section=${newSection}`);
    };

    const renderSectionContent = () => {
        switch (section) {
            case 'general':
                return <GeneralSettings/>;
            case 'account':
                return <div>Акаунт і безпека</div>;
            case 'billing':
                return <div>Оплата та підписки</div>;
            case 'display':
                return <div>Налаштування відображення</div>;
            case 'notifications':
                return <div>Сповіщення та приватність</div>;
            default:
                return <div>Оберіть секцію</div>;
        }
    };

    return (
        <div className={styles.settingsContainer}>
            <div className={styles.mainContent}>
                {renderSectionContent()}
            </div>
            <div className={styles.accordionSection}>
                <AccordionSelector
                    title="General Settings"
                    onClick={() => handleSectionChange('general')}
                    isActive={section === 'general'}
                >
                    <ul>
                        <li>Custom URL</li>
                        <li>Your friend code</li>
                        <li>Avatar</li>
                        <li>Profile hat</li>
                    </ul>
                </AccordionSelector>

                <AccordionSelector
                    title="Account & Security"
                    onClick={() => handleSectionChange('account')}
                    isActive={section === 'account'}
                >
                    <ul>
                        <li>Change Email / Phone</li>
                        <li>Change Password</li>
                        <li>2FFA</li>
                        <li>Connected Accounts</li>
                        <li>Session Management</li>
                    </ul>
                </AccordionSelector>

                <AccordionSelector
                    title="Billing & Payments"
                    onClick={() => handleSectionChange('billing')}
                    isActive={section === 'billing'}
                >
                    <ul>
                        <li>Transaction History</li>
                        <li>Manage Subscriptions</li>
                        <li>Currency Display</li>
                    </ul>
                </AccordionSelector>

                <AccordionSelector
                    title="Display Preferences"
                    onClick={() => handleSectionChange('display')}
                    isActive={section === 'display'}
                >
                    <ul>
                        <li>Theme</li>
                    </ul>
                </AccordionSelector>

                <AccordionSelector
                    title="Notifications & Privacy"
                    onClick={() => handleSectionChange('notifications')}
                    isActive={section === 'notifications'}
                >
                    <ul>
                        <li>Block List</li>
                        <li>Profile Visibility</li>
                    </ul>
                </AccordionSelector>
            </div>
        </div>
    );
};

export default SettingsPage;
