"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import type { ComponentProps, HTMLAttributes, ReactNode } from "react";
import { createContext, useContext, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
  materialLight,
  materialDark,
  atomDark
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

type CodeBlockContextType = {
  code: string;
};

const CodeBlockContext = createContext<CodeBlockContextType>({
  code: "",
});

export type CodeBlockProps = HTMLAttributes<HTMLDivElement> & {
  code: string;
  language: string;
  showLineNumbers?: boolean;
  children?: ReactNode;
};

export const CodeBlock = ({ className, children, ...props }: any) => {
  const match = /language-(\w+)/.exec(className || "");
  const language = match ? match[1] : "";
  const code = String(children).replace(/\n$/, "");

  if (match) {
    return (
      <CodeBlockContext.Provider value={{ code }}>
        <div
          className={cn(
            "relative w-full overflow-hidden rounded-md border bg-background text-foreground my-3",
            className
          )}
          {...props}
        >
          <div className="relative">
            <SyntaxHighlighter
              language={language}
              style={oneLight}
              customStyle={{
                margin: 0,
                padding: "1rem",
                fontSize: "0.875rem",
                background: "hsl(var(--background))",
                color: "hsl(var(--foreground))",
              }}
              lineNumberStyle={{
                color: "hsl(var(--muted-foreground))",
                paddingRight: "1rem",
                minWidth: "2.5rem",
              }}
              codeTagProps={{
                className: "font-mono text-sm",
              }}
              className="dark:hidden overflow-hidden"
            >
              {code}
            </SyntaxHighlighter>
            <SyntaxHighlighter
              language={language}
              style={oneDark}
              customStyle={{
                margin: 0,
                padding: "1rem",
                fontSize: "0.875rem",
                background: "hsl(var(--background))",
                color: "hsl(var(--foreground))",
              }}
              lineNumberStyle={{
                color: "hsl(var(--muted-foreground))",
                paddingRight: "1rem",
                minWidth: "2.5rem",
              }}
              codeTagProps={{
                className: "font-mono text-sm",
              }}
              className="hidden dark:block overflow-hidden"
            >
              {code}
            </SyntaxHighlighter>
            {children && (
              <div className="absolute right-2 top-2 flex items-center gap-2">
                <CodeBlockCopyButton
                  onCopy={() => navigator.clipboard.writeText(children)}
                />
              </div>
            )}
          </div>
        </div>
      </CodeBlockContext.Provider>
    );
  }

  return (
    <code
      className="bg-muted rounded px-[0.35rem] py-[0.2rem] font-mono text-xs sm:text-sm"
      {...props}
    >
      {children}
    </code>
  );
};

export type CodeBlockCopyButtonProps = ComponentProps<typeof Button> & {
  onCopy?: () => void;
  onError?: (error: Error) => void;
  timeout?: number;
};

export const CodeBlockCopyButton = ({
  onCopy,
  onError,
  timeout = 2000,
  children,
  className,
  ...props
}: CodeBlockCopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const { code } = useContext(CodeBlockContext);

  const copyToClipboard = async () => {
    if (typeof window === "undefined" || !navigator.clipboard.writeText) {
      onError?.(new Error("Clipboard API not available"));
      return;
    }

    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      onCopy?.();
      setTimeout(() => setIsCopied(false), timeout);
    } catch (error) {
      onError?.(error as Error);
    }
  };

  const Icon = isCopied ? CheckIcon : CopyIcon;

  return (
    <Button
      className={cn("shrink-0", className)}
      onClick={copyToClipboard}
      size="icon"
      variant="ghost"
      {...props}
    >
      {children ?? <Icon size={14} />}
    </Button>
  );
};
