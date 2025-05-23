'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navigation.module.scss';

export default function NavLink({ href, exact = false, children }) {
    const pathname = usePathname();

    const normalize = (url) => url.replace(/\/$/, '');

    const isActive = exact
        ? normalize(pathname) === normalize(href)
        : normalize(pathname).startsWith(normalize(href));

    const className = isActive ? styles.activeLink : '';

    return (
        <li className={className}>
            <Link href={href}>{children}</Link>
        </li>
    );
}
