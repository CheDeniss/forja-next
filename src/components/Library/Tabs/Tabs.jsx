'use client';

import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from './Tabs.module.scss';

const Tabs = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const activeTab = searchParams.get('tab') || 'all';

    const handleTabChange = (tab) => {
        const params = new URLSearchParams(searchParams);
        params.set('tab', tab);
        router.replace(`?${params.toString()}`);
    };

    return (
        <div className={styles.tabsWrapper}>
            <button
                className={`${styles.tab} ${activeTab === 'all' ? styles.active : ''}`}
                onClick={() => handleTabChange('all')}
            >
                ALL
            </button>
            <button
                className={`${styles.tab} ${activeTab === 'wishlist' ? styles.active : ''}`}
                onClick={() => handleTabChange('wishlist')}
            >
                WISHLIST
            </button>
        </div>
    );
};

export default Tabs;
