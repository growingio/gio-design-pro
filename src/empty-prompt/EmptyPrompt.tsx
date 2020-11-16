import * as React from 'react';
import classnames from 'classnames';
import EmptySVG from './EmptySVG';
import { EmptyPromptProps } from './interfaces';

const classPrefix = 'gio-empty-prompt';

function EmptyPrompt(props: EmptyPromptProps) {
  const { className, description = 'No data', children } = props;
  return (
    <div className={classnames(classPrefix, className)}>
      <EmptySVG />
      {description && <p className={`${classPrefix}__description`}>{description}</p>}
      {children && <p className={`${classPrefix}__footer`}>{children}</p>}
    </div>
  );
}

export default EmptyPrompt;
