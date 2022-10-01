import { TouchEvent } from 'react';

export function isIOS() {
  return !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
}

export function getIOSInputEventHandlers() {
  if (isIOS()) {
    return {};
  }

  return {
    onTouchStart: (e: TouchEvent<HTMLElement>) => {
      e.currentTarget.style.fontSize = '16px';
    },
    onBlur: (e: React.FocusEvent<HTMLElement>) => {
      e.currentTarget.style.fontSize = '';
    },
  };
}
