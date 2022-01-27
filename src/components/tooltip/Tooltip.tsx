import React, { useState } from 'react';
import './tooltip.scss';

type ToolTipProps = {
  direction?: string;
  delay?: number;
  children: React.ReactFragment;
  content: string;
};

/**
 * Компонент "Тултип"
 * @returns {React.ReactElement} - react-элемент
 */

export const Tooltip: React.FC<ToolTipProps> = ({
  children,
  direction,
  delay,
  content,
}: ToolTipProps): React.ReactElement => {
  let timeout: any;
  const [active, setActive] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, delay);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <div
      className="Tooltip-Wrapper"
      // When to show the tooltip
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {/* Wrapping */}
      {children}
      {active && (
        <div className={`Tooltip-Tip ${direction}`}>
          {/* Content */}
          {content}
        </div>
      )}
    </div>
  );
};

Tooltip.defaultProps = {
  direction: 'top',
  delay: 400,
};
