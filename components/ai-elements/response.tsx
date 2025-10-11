"use client";

import { cn } from "@/lib/utils";
import { type ComponentProps, memo } from "react";
import { Streamdown } from "streamdown";
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";

type ResponseProps = ComponentProps<typeof Streamdown>;

export const Response = memo(
  ({ className, ...props }: ResponseProps) => (
    <Streamdown
      components={{
        ol: ({ node, children, className, ...props }) => (
          <ol
            className={cn("ml-4 list-outside list-decimal", className)}
            {...props}
          >
            {children}
          </ol>
        ),
        li: ({ node, children, className, ...props }) => (
          <li className={cn("py-1", className)} {...props}>
            {children}
          </li>
        ),
        ul: ({ node, children, className, ...props }) => (
          <ul
            className={cn("ml-4 list-outside list-decimal", className)}
            {...props}
          >
            {children}
          </ul>
        ),
        strong: ({ node, children, className, ...props }) => (
          <span className={cn("font-semibold", className)} {...props}>
            {children}
          </span>
        ),
        a: ({ node, children, className, ...props }) => (
          <a
            className={cn("font-medium text-primary underline", className)}
            rel="noreferrer"
            target="_blank"
            {...props}
          >
            {children}
          </a>
        ),
        h1: ({ node, children, className, ...props }) => (
          <h1
            className={cn(
              "mt-6 mb-2 font-semibold text-3xl leading-relaxed",
              className
            )}
            {...props}
          >
            {children}
          </h1>
        ),
        h2: ({ node, children, className, ...props }) => (
          <h2
            className={cn(
              "mt-6 mb-2 font-semibold text-2xl leading-7",
              className
            )}
            {...props}
          >
            {children}
          </h2>
        ),
        h3: ({ node, children, className, ...props }) => (
          <h3
            className={cn(
              "mt-6 mb-2 font-semibold text-xl leading-7",
              className
            )}
            {...props}
          >
            {children}
          </h3>
        ),
        h4: ({ node, children, className, ...props }) => (
          <h4
            className={cn(
              "mt-6 mb-2 font-semibold text-lg leading-relaxed",
              className
            )}
            {...props}
          >
            {children}
          </h4>
        ),
        h5: ({ node, children, className, ...props }) => (
          <h5
            className={cn(
              "mt-6 mb-2 font-semibold text-base leading-7",
              className
            )}
            {...props}
          >
            {children}
          </h5>
        ),
        h6: ({ node, children, className, ...props }) => (
          <h6
            className={cn(
              "mt-6 mb-2 font-semibold text-sm leading-7",
              className
            )}
            {...props}
          >
            {children}
          </h6>
        ),
       
        p({ children }: any) {
          return (
            <p className="leading-7  [&:not(:first-child)]:mt-3">{children}</p>
          );
        },
      }}
      className={cn(
        "size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
        className
      )}
      {...props}
    />
  ),
  (prevProps, nextProps) => prevProps.children === nextProps.children
);

Response.displayName = "Response";
