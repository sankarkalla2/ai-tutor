"use client";
import Link from "next/link";
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";

export function getMDXComponents() {
  return {
    a: (props: any) => (
      <Link
        {...props}
        className="text-blue-600 hover:underline underline-offset-2"
      />
    ),
    pre: ({  ...props }) => (
      <CodeBlock {...props}>
        <Pre>{props.children}</Pre>
      </CodeBlock>
    ),
  };
}
