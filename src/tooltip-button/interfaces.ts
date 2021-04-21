import { ButtonProps } from '@gio-design/components/es/components/button/interfaces';
import { TooltipProps } from '@gio-design/components/es/components/tooltip/interface';

export interface TooltipButtonProps extends ButtonProps {
  tooltipProps?: Omit<TooltipProps, 'children'>;
}
