/* eslint-disable prettier/prettier */
import React from 'react';
import { BaseProps, Resource } from '../utils/interfaces';
import { SelectorProps } from '../selector/interfaces';

export interface UserPickerProps {
  /**
   * Specifies a delay in milliseconds for triggering item hover event
   */
  itemOnHoverDelay?: number;
  /**
   * Segments to be displayed
   */
  segments: Resource[];
  /**
   * Current user id for filtering segments in my tab
   */
  userId: string;
  /**
   * Callback when select a segement
   */
  onSelect?: (value: string, resource?: Resource) => void;
  /**
   * Callback when click creating button
   */
  onCreateSegment: () => void;
  /**
   * The delay of updating recent segements
   */
  updatingRecentDelay?: number;
  /**
   * Callback when to show segment chart
   */
  onShowSegmentChart: (resource: Resource) => React.ReactNode;
  /**
   * disabled options ，an array of Resource.id s
   */
  disabledValues?: string[];
}

export interface SegmentCardProps extends BaseProps {
  name: string;
  detector?: {
    totalUsers: number;
    usersRatio: number;
  };
  chart?: React.ReactNode;
  creator?: string;
  updatedAt?: string;
}

export interface UserSelectorProps
  extends Omit<SelectorProps, 'dropdownRender' | 'valueRender'>,
  Omit<UserPickerProps, 'className' | 'style'> { }
