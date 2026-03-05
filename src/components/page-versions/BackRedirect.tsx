"use client";

import { useBackRedirect } from "@/hooks/use-back-redirect";
import { useEffect, useState } from "react";

interface BackRedirectProps {
    contentId: string;
}

export function BackRedirect({ contentId }: BackRedirectProps) {
    const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

    useEffect(() => {
        if (!contentId) return;

        // Fetch back redirect config for this page
        fetch(`/api/back-redirect?contentId=${contentId}`)
            .then(res => res.json())
            .then(data => {
                if (data && data.url && data.active !== false) {
                    setRedirectUrl(data.url);
                }
            })
            .catch(err => console.warn('Failed to load back redirect config:', err));
    }, [contentId]);

    useBackRedirect(redirectUrl, !!redirectUrl);

    return null;
}
