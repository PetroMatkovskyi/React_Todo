import React from 'react';

import cn from 'classnames';

import './Button.scss';

export const Button = ({
  onClick,
  isAddBtn,
  isListBtn,
  isLinkBtn,
  isRemoveBtn,
  children,
}) => (
  <button
    onClick={onClick}
    className={cn({
      btn: true,
      add: isAddBtn,
      remove: isRemoveBtn,
      list: isListBtn,
      linkRemove: isLinkBtn,
    })}
  >
    {children}
  </button>
);
