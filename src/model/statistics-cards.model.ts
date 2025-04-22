import type { ComponentType, ReactNode, SVGProps } from "react";

export type IconType = ComponentType<SVGProps<SVGSVGElement>>;

export interface StatisticsCardFooter {
  color: string;
  value: string;
  label: string;
}
export type AssociationFilter = 'all' | 'mandate_expiring' | 'certificate_expiring' | 'new_this_week';

export interface StatisticsCardProps {
  color: string;
  icon: ReactNode;
  title: string;
  value: string;
  footer: StatisticsCardFooter;
  filter?: AssociationFilter;
  loading?: boolean;
  route?: string
}

