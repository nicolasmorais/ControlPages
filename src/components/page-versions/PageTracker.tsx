"use client";

import { usePageTracker } from '@/hooks/use-page-tracker';
import { useEffect, useState } from 'react';

interface PageTrackerProps {
  contentId: string;
}

interface Pixel {
  provider: string;
  code: string;
}

export function PageTracker({ contentId }: PageTrackerProps) {
  usePageTracker(contentId);
  const [pixels, setPixels] = useState<Pixel[]>([]);

  useEffect(() => {
    if (!contentId) return;

    fetch(`/api/pixels/active?contentId=${contentId}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setPixels(data);
          // Executar scripts contidos no código
          data.forEach(p => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = p.code;
            const scripts = tempDiv.querySelectorAll('script');
            scripts.forEach(oldScript => {
              const newScript = document.createElement('script');
              Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
              newScript.appendChild(document.createTextNode(oldScript.innerHTML));
              document.head.appendChild(newScript);
            });
          });
        }
      })
      .catch(err => console.warn('Failed to load pixels:', err));
  }, [contentId]);

  return (
    <>
      {pixels.map((p, i) => (
        <div key={i} className="hidden" dangerouslySetInnerHTML={{ __html: p.code.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gim, "") }} />
      ))}
    </>
  );
}