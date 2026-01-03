/**
 * Cookie Consent für vollkommenbraut.de
 * DSGVO-konforme Cookie-Einwilligung
 */

(function() {
    'use strict';

    // Konfiguration
    const COOKIE_NAME = 'cookie_consent';
    const COOKIE_DAYS = 365;

    // Cookie-Funktionen
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/;SameSite=Lax';
    }

    function getCookie(name) {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i].trim();
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
        }
        return null;
    }

    // Google Analytics/Ads laden
    function loadGoogleAds() {
        // gtag.js Script laden
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=AW-867464507';
        document.head.appendChild(script);

        // gtag initialisieren
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', 'AW-867464507');
    }

    // Banner erstellen
    function createBanner() {
        const banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.innerHTML = `
            <div class="cookie-consent-content">
                <p>Wir verwenden Cookies, um unsere Website zu optimieren und Ihnen das bestmögliche Online-Erlebnis zu bieten. 
                Mit dem Klick auf „Alle akzeptieren" erlauben Sie die Verwendung von Cookies für Analyse- und Marketingzwecke. 
                Weitere Informationen finden Sie in unserer <a href="/datenschutz/">Datenschutzerklärung</a>.</p>
                <div class="cookie-consent-buttons">
                    <button id="cookie-accept-all" class="cookie-btn cookie-btn-accept">Alle akzeptieren</button>
                    <button id="cookie-accept-essential" class="cookie-btn cookie-btn-essential">Nur essenzielle</button>
                </div>
            </div>
        `;
        document.body.appendChild(banner);

        // Event Listener
        document.getElementById('cookie-accept-all').addEventListener('click', function() {
            acceptAll();
        });

        document.getElementById('cookie-accept-essential').addEventListener('click', function() {
            acceptEssential();
        });
    }

    // Alle Cookies akzeptieren
    function acceptAll() {
        setCookie(COOKIE_NAME, 'all', COOKIE_DAYS);
        hideBanner();
        loadGoogleAds();
    }

    // Nur essenzielle Cookies
    function acceptEssential() {
        setCookie(COOKIE_NAME, 'essential', COOKIE_DAYS);
        hideBanner();
        // Google Ads wird NICHT geladen
    }

    // Banner ausblenden
    function hideBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.classList.add('cookie-consent-hidden');
            setTimeout(function() {
                banner.remove();
            }, 300);
        }
    }

    // Initialisierung
    function init() {
        const consent = getCookie(COOKIE_NAME);

        if (consent === 'all') {
            // Einwilligung vorhanden - Google Ads laden
            loadGoogleAds();
        } else if (consent === 'essential') {
            // Nur essenzielle - nichts laden
        } else {
            // Keine Einwilligung - Banner zeigen
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', createBanner);
            } else {
                createBanner();
            }
        }
    }

    // Starten
    init();

})();

