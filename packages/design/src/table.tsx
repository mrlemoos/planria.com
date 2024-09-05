import {
  forwardRef,
  type HTMLAttributes,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
} from "react";

import { cn } from "./css";

export interface TableProps extends HTMLAttributes<HTMLTableElement> {}

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className, ...props }, forwardedRef) => (
    <div className="relative w-full overflow-auto">
      <table
        ref={forwardedRef}
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
);
Table.displayName = "Table";

export interface TableHeaderProps
  extends HTMLAttributes<HTMLTableSectionElement> {}

export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  TableHeaderProps
>(({ className, ...props }, forwardedRef) => (
  <thead
    ref={forwardedRef}
    className={cn("[&_tr]:border-b", className)}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

export interface TableBodyProps
  extends HTMLAttributes<HTMLTableSectionElement> {}

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, forwardedRef) => (
    <tbody
      ref={forwardedRef}
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
);
TableBody.displayName = "TableBody";

export interface TableFooterProps
  extends HTMLAttributes<HTMLTableSectionElement> {}

export const TableFooter = forwardRef<
  HTMLTableSectionElement,
  TableFooterProps
>(({ className, ...props }, forwardedRef) => (
  <tfoot
    ref={forwardedRef}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, ...props }, forwardedRef) => (
    <tr
      ref={forwardedRef}
      className={cn(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className
      )}
      {...props}
    />
  )
);
TableRow.displayName = "TableRow";

export interface TableHeadProps
  extends ThHTMLAttributes<HTMLTableCellElement> {}

export const TableHead = forwardRef<
  HTMLTableCellElement,
  ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, forwardedRef) => (
  <th
    ref={forwardedRef}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

export interface TableCellProps
  extends TdHTMLAttributes<HTMLTableCellElement> {}

export const TableCell = forwardRef<
  HTMLTableCellElement,
  TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, forwardedRef) => (
  <td
    ref={forwardedRef}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
));
TableCell.displayName = "TableCell";

export interface TableCaptionProps
  extends HTMLAttributes<HTMLTableCaptionElement> {}

export const TableCaption = forwardRef<
  HTMLTableCaptionElement,
  TableCaptionProps
>(({ className, ...props }, forwardedRef) => (
  <caption
    ref={forwardedRef}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";
