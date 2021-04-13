import React from 'react';
import { Resource } from './interfaces';

export function resourceToItem(
  resource: Resource,
  mouseEvents?: {
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    onMouseEnter?: (e: React.MouseEvent<HTMLElement>) => void;
    onMouseLeave?: (e: React.MouseEvent<HTMLElement>) => void;
  },
  disabled?: boolean
) {
  return {
    key: resource.id,
    children: resource.name,
    ...mouseEvents,
    disabled,
  };
}

export default {
  resourceToItem,
};
