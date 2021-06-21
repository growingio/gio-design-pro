import { ButtonProps } from '@gio-design/components/es/components/button/interfaces';
import { TooltipProps } from '@gio-design/components/es/components/tooltip/interface';

export interface Props extends Omit<ButtonProps, 'type'> {
  type?: 'primary' | 'secondary' | 'text' | 'link';
}
export interface TooltipButtonProps extends Props {
  tooltipProps?: Omit<TooltipProps, 'children'>;
}
