'use client';

import { useEffect, useState } from 'react';
import { SITE } from '@/data/content';
import styles from './SiteProtection.module.css';

const PROTECTED_SELECTOR = 'img, picture, video, [data-protected-asset]';
const DEVTOOLS_QUERY_KEY = 'zerotrace:allow-devtools';

const BLOCKED_SHORTCUTS = new Set([
  'f12',
  'ctrl+shift+i',
  'ctrl+shift+j',
  'ctrl+shift+c',
  'ctrl+u',
  'ctrl+s',
  'ctrl+p',
  'meta+alt+i',
  'meta+alt+j',
  'meta+alt+c',
]);

function isProtectedTarget(target: EventTarget | null) {
  return target instanceof Element && Boolean(target.closest(PROTECTED_SELECTOR));
}

function shortcutKey(event: KeyboardEvent) {
  const parts: string[] = [];
  if (event.ctrlKey) parts.push('ctrl');
  if (event.metaKey) parts.push('meta');
  if (event.altKey) parts.push('alt');
  if (event.shiftKey) parts.push('shift');
  parts.push(event.key.toLowerCase());
  return parts.join('+');
}

function devtoolsAllowed() {
  if (process.env.NODE_ENV !== 'production') return true;
  if (typeof window === 'undefined') return false;
  if (window.localStorage.getItem(DEVTOOLS_QUERY_KEY) === '1') return true;
  return new URLSearchParams(window.location.search).has('devtools');
}

function detectDevToolsOpen() {
  const widthGap = window.outerWidth - window.innerWidth > 160;
  const heightGap = window.outerHeight - window.innerHeight > 160;
  return widthGap || heightGap;
}

/** Client-side guard: media protection, shortcut blocking, and devtools deterrence. */
export function SiteProtection() {
  const [devtoolsOpen, setDevtoolsOpen] = useState(false);

  useEffect(() => {
    const protectMedia = () => {
      document.querySelectorAll<HTMLElement>(PROTECTED_SELECTOR).forEach((node) => {
        node.setAttribute('draggable', 'false');
        node.dataset.protectedAsset = 'true';
      });
    };

    const blockContextMenu = (event: MouseEvent) => {
      if (isProtectedTarget(event.target)) {
        event.preventDefault();
      }
    };

    const blockDragStart = (event: DragEvent) => {
      if (isProtectedTarget(event.target)) {
        event.preventDefault();
      }
    };

    const blockDrop = (event: DragEvent) => {
      if (isProtectedTarget(event.target)) {
        event.preventDefault();
      }
    };

    const blockShortcuts = (event: KeyboardEvent) => {
      if (devtoolsAllowed()) return;
      if (BLOCKED_SHORTCUTS.has(shortcutKey(event))) {
        event.preventDefault();
        event.stopPropagation();
        setDevtoolsOpen(true);
      }
    };

    protectMedia();

    const observer = new MutationObserver(protectMedia);
    observer.observe(document.body, { childList: true, subtree: true });

    document.addEventListener('contextmenu', blockContextMenu);
    document.addEventListener('dragstart', blockDragStart);
    document.addEventListener('drop', blockDrop);
    document.addEventListener('keydown', blockShortcuts, true);

    let devtoolsInterval: number | undefined;

    if (!devtoolsAllowed()) {
      const checkDevtools = () => {
        if (detectDevToolsOpen()) {
          setDevtoolsOpen(true);
        }
      };

      checkDevtools();
      devtoolsInterval = window.setInterval(checkDevtools, 1000);

      const onResize = () => checkDevtools();
      window.addEventListener('resize', onResize);

      return () => {
        observer.disconnect();
        document.removeEventListener('contextmenu', blockContextMenu);
        document.removeEventListener('dragstart', blockDragStart);
        document.removeEventListener('drop', blockDrop);
        document.removeEventListener('keydown', blockShortcuts, true);
        window.removeEventListener('resize', onResize);
        if (devtoolsInterval) window.clearInterval(devtoolsInterval);
      };
    }

    return () => {
      observer.disconnect();
      document.removeEventListener('contextmenu', blockContextMenu);
      document.removeEventListener('dragstart', blockDragStart);
      document.removeEventListener('drop', blockDrop);
      document.removeEventListener('keydown', blockShortcuts, true);
      if (devtoolsInterval) window.clearInterval(devtoolsInterval);
    };
  }, []);

  if (!devtoolsOpen || devtoolsAllowed()) {
    return null;
  }

  return (
    <div className={styles.devtoolsShield} role="alertdialog" aria-modal="true" aria-labelledby="devtools-shield-title">
      <div className={styles.devtoolsShieldInner}>
        <p id="devtools-shield-title" className={styles.devtoolsShieldTitle}>
          Protected experience
        </p>
        <p className={styles.devtoolsShieldCopy}>
          Developer tools are disabled on the public {SITE.name} site to protect UI assets and
          implementation details. Download the open-source app from GitHub to audit the product
          code.
        </p>
      </div>
    </div>
  );
}
