"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Hook para registrar uma visualização de página no endpoint de analytics.
 * Deve ser chamado no componente de página principal (V1Page, APPage, CustomAdvertorialPage).
 * @param contentId O ID do conteúdo que está sendo exibido (ex: 'v1', 'ap', ou UUID do advertorial).
 */
export function usePageTracker(contentId: string) {
  const pathname = usePathname();

  useEffect(() => {
    if (!contentId) return;

    const trackPageView = async () => {
      try {
        // Não esperamos a resposta, apenas disparamos o evento
        await fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contentId, path: pathname }),
        });
      } catch (error) {
        console.warn('Failed to send page view tracking event:', error);
      }
    };

    trackPageView();
  }, [contentId, pathname]);
}