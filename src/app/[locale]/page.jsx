'use client';

import "../../i18n/i18n";
import { useTranslation } from "react-i18next";
import homeStyles from "./Home.module.css";
import MainHome from "@/app/components/Home_components/MainHome.jsx";

export default function HomePage() {
    const { t } = useTranslation(['common', 'navmenu']); // вибір namespace за потреби

    return(
        <div className={homeStyles.container}>
            <MainHome/>
        </div>
    );

}

