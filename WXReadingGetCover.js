// ==UserScript==
// @name         WXReading Get Cover
// @namespace    http://tampermonkey.net/
// @version      2026-04-05
// @description  Add a copy button on WeRead cover image and copy cover src.
// @author       lucasfong
// @match        https://weread.qq.com/web/bookDetail/*
// @match        https://weread.qq.com/web/reader/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=weread.qq.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const COVER_XPATHS = [
        '//*[@id="routerView"]/div[1]/div[2]/div[1]/div[1]/img',
        '//*[@id="routerView"]/div/div[1]/div[2]/div/div/div[2]/div[2]/div/div[1]/div[1]/div/img'
    ];
    const BUTTON_ID = 'tm-weread-copy-cover-btn';

    function getCoverImgByXPath() {
        for (const xpath of COVER_XPATHS) {
            const result = document.evaluate(
                xpath,
                document,
                null,
                XPathResult.FIRST_ORDERED_NODE_TYPE,
                null
            );

            if (result.singleNodeValue) {
                return result.singleNodeValue;
            }
        }

        return null;
    }

    async function copyText(text) {
        if (!text) return false;

        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.setAttribute('readonly', 'readonly');
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            textarea.style.pointerEvents = 'none';
            document.body.appendChild(textarea);
            textarea.select();

            const ok = document.execCommand('copy');
            document.body.removeChild(textarea);
            return ok;
        }
    }

    function flashButtonText(button, text) {
        const prev = button.textContent;
        button.textContent = text;
        setTimeout(() => {
            button.textContent = prev;
        }, 1200);
    }

    function injectCopyButton() {
        const coverImg = getCoverImgByXPath();
        if (!coverImg || !(coverImg instanceof HTMLImageElement)) return;

        const parent = coverImg.parentElement;
        if (!parent) return;

        if (parent.querySelector(`#${BUTTON_ID}`)) return;

        const parentStyle = window.getComputedStyle(parent);
        if (parentStyle.position === 'static') {
            parent.style.position = 'relative';
        }

        const btn = document.createElement('button');
        btn.id = BUTTON_ID;
        btn.type = 'button';
        btn.textContent = '复制封面链接';
        btn.style.position = 'absolute';
        btn.style.right = '8px';
        btn.style.bottom = '8px';
        btn.style.zIndex = '9999';
        btn.style.padding = '6px 10px';
        btn.style.fontSize = '12px';
        btn.style.lineHeight = '1';
        btn.style.border = 'none';
        btn.style.borderRadius = '6px';
        btn.style.background = 'rgba(0, 0, 0, 0.7)';
        btn.style.color = '#fff';
        btn.style.cursor = 'pointer';

        btn.addEventListener('click', async (event) => {
            event.stopPropagation();
            const src = coverImg.getAttribute('src') || '';
            const ok = await copyText(src);
            flashButtonText(btn, ok ? '已复制' : '复制失败');
        });

        parent.appendChild(btn);
    }

    function init() {
        injectCopyButton();

        // WeRead is SPA and content may render asynchronously.
        const observer = new MutationObserver(() => {
            injectCopyButton();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        setInterval(injectCopyButton, 1500);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
        init();
    }
})();