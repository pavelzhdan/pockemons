import React, { useState } from 'react';
import './tooltip.scss';

type ToolTipProps = {
  direction?: string;
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
  content,
}: ToolTipProps): React.ReactElement => {
  const [active, setActive] = useState(false);

  const showTip = () => {
    setActive(true);
  };

  const hideTip = () => {
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
};
