// page.jsx
"use client";

import { Suspense } from "react";
import Loader from "../components/ui/Loader/Loader.jsx";
import VerifyEmailContent from "./VerifyEmailContent.jsx";

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={<Loader loading />}>
            <VerifyEmailContent />
        </Suspense>
    );
}
