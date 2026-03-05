"use client";

import { useEffect } from 'react';

/**
 * Hook para implementar a funcionalidade de "Back Redirect".
 * Quando o usuário pressiona o botão "voltar" do navegador, ele é redirecionado para a URL especificada.
 * 
 * @param targetUrl A URL para onde o usuário deve ser enviado.
 * @param enabled Se o redirecionamento está ativo.
 */
export function useBackRedirect(targetUrl: string | null, enabled: boolean = true) {
    useEffect(() => {
        if (!enabled || !targetUrl) return;

        const setupRedirect = () => {
            if (window.history && window.history.pushState) {
                // Adiciona um estado fictício extra para "travar" o histórico
                // No mobile, alguns browsers precisam de mais profundidade no histórico
                window.history.pushState(null, "", window.location.href);
                window.history.pushState(null, "", window.location.href);

                const handlePopState = (event: PopStateEvent) => {
                    // Previne o comportamento padrão e redireciona imediatamente
                    console.log("Back Redirect disparado:", targetUrl);

                    // Em mobile, às vezes precisamos forçar o replace para evitar o loop
                    window.location.replace(targetUrl);

                    // Caso o replace falhe ou demore, tentamos o href também
                    setTimeout(() => {
                        window.location.href = targetUrl;
                    }, 50);
                };

                window.addEventListener('popstate', handlePopState);

                return () => {
                    window.removeEventListener('popstate', handlePopState);
                };
            }
        };

        // Algumas versões mobile do Chrome/Safari ignoram pushState se não houver interação
        // Vamos rodar no load E garantir que rode após o primeiro toque do usuário
        const timer = setTimeout(setupRedirect, 500);

        const interactionHandler = () => {
            setupRedirect();
            window.removeEventListener('touchstart', interactionHandler);
            window.removeEventListener('mousedown', interactionHandler);
        };

        window.addEventListener('touchstart', interactionHandler);
        window.addEventListener('mousedown', interactionHandler);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('touchstart', interactionHandler);
            window.removeEventListener('mousedown', interactionHandler);
        };
    }, [targetUrl, enabled]);
}
