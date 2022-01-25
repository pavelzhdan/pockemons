import React, { useState } from 'react';
import './tooltip.scss';

interface ToolTipProps {
  direction?: string;
  delay?: number;
  children: React.ReactFragment;
  content: string;
}

export const Tooltip: React.FC<ToolTipProps> = ({
  children, direction = 'top', delay = 400, content,
}: ToolTipProps): React.ReactElement => {
  let timeout: NodeJS.Timeout;
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
