// "use client";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import remarkMath from "remark-math";
// import rehypeKatex from "rehype-katex";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
// import { Copy, Check, ExternalLink } from "lucide-react";
// import { useState } from "react";
// import "katex/dist/katex.min.css";
// import { atomDark, nightOwl,  } from "react-syntax-highlighter/dist/esm/styles/prism";

// interface MarkdownRendererProps {
//   content: string;
//   className?: string;
// }

// const CodeBlock = ({ children, className, ...props }: any) => {
//   const [copied, setCopied] = useState(false);
//   const match = /language-(\w+)/.exec(className || "");
//   const language = match ? match[1] : "";
//   const code = String(children).replace(/\n$/, "");

//   const copyToClipboard = async () => {
//     await navigator.clipboard.writeText(code);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   if (match) {
//     return (
//       <div className="relative group my-6 rounded-xl overflow-hidden shadow-lg border border-border bg-background">
//         {/* Header bar */}
//         <div className="flex items-center justify-between px-4 py-1 backdrop-blur-sm border-b border-border bg-zinc-100 dark:bg-zinc-950">
//           <span className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider">
//             {language}
//           </span>

//           {/* Copy Button */}
//           <button
//             onClick={copyToClipboard}
//             aria-label={
//               copied ? "Code copied to clipboard" : "Copy code to clipboard"
//             }
//             className={`flex items-center gap-1 px-3 py-1 rounded-md text-xs sm:text-sm font-medium
//               transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50
//               ${
//                 copied
//                   ? "bg-green-500 text-white shadow hover:bg-green-600"
//                   : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
//               }`}
//           >
//             {/* Icon with smooth transition */}
//             <span
//               className={`flex items-center transition-transform duration-300 ${
//                 copied ? "translate-y-0 opacity-100" : "opacity-100"
//               }`}
//             >
//               {copied ? <Check size={13} /> : <Copy size={13} />}
//             </span>
//             <span className="hidden sm:inline">
//               {copied ? "Copied!" : "Copy"}
//             </span>
//           </button>
//         </div>

//         {/* Code */}
//         <SyntaxHighlighter
//           style={nightOwl}
//           language={language}
//           PreTag="div"
//           className="!mt-0 !rounded-t-none"

//           customStyle={{
//             margin: 0,
//             borderTopLeftRadius: 0,
//             borderTopRightRadius: 0,
//             fontSize: "0.875rem",
//             padding: "1rem",
//           }}
//         >
//           {code}
//         </SyntaxHighlighter>
//       </div>
//     );
//   }

//   // Inline code
//   return (
//     <code
//       className="bg-muted rounded px-[0.35rem] py-[0.2rem] font-mono text-xs sm:text-sm"
//       {...props}
//     >
//       {children}
//     </code>
//   );
// };

// const TableComponent = ({ children }: any) => (
//   <div className="my-8 overflow-x-auto">
//     <div className="inline-block min-w-full shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
//       <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//         {children}
//       </table>
//     </div>
//   </div>
// );

// const TableHead = ({ children }: any) => (
//   <thead className="bg-gray-50 dark:bg-gray-800">{children}</thead>
// );

// const TableRow = ({ children }: any) => (
//   <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
//     {children}
//   </tr>
// );

// const TableCell = ({ children, ...props }: any) => (
//   <td
//     className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 border-t border-gray-200 dark:border-gray-700"
//     {...props}
//   >
//     {children}
//   </td>
// );

// const TableHeaderCell = ({ children, ...props }: any) => (
//   <th
//     className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
//     {...props}
//   >
//     {children}
//   </th>
// );

// const LinkComponent = ({ href, children }: any) => (
//   <a
//     href={href}
//     target={href?.startsWith("http") ? "_blank" : undefined}
//     rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
//     className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline decoration-2 underline-offset-2 hover:decoration-blue-600 dark:hover:decoration-blue-400 transition-colors inline-flex items-center gap-1"
//   >
//     {children}
//     {href?.startsWith("http") && <ExternalLink size={14} />}
//   </a>
// );

// const BlockquoteComponent = ({ children }: any) => (
//   <blockquote className="my-6 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r-lg">
//     <div className="text-gray-700 dark:text-gray-300 italic">{children}</div>
//   </blockquote>
// );

// const ImageComponent = ({ src, alt }: any) => (
//   <div className="my-8 text-center">
//     <img
//       src={src || "/placeholder.svg"}
//       alt={alt}
//       className="max-w-full h-auto rounded-lg shadow-lg mx-auto"
//       loading="lazy"
//     />
//     {alt && (
//       <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 italic">
//         {alt}
//       </p>
//     )}
//   </div>
// );

// export function MarkdownRenderer({
//   content,
//   className = "",
// }: MarkdownRendererProps) {
//   const customComponents = {
//     code: CodeBlock,
//     a: LinkComponent,
//     img: ImageComponent,

//     table({ children }: any) {
//       return (
//         <div className="overflow-x-auto my-6">
//           <table className="min-w-full border-collapse border border-border bg-card">
//             {children}
//           </table>
//         </div>
//       );
//     },
//     th({ children }: any) {
//       return (
//         <th className="border border-border bg-muted px-4 py-3 text-left font-semibold text-foreground">
//           {children}
//         </th>
//       );
//     },
//     td({ children }: any) {
//       return (
//         <td className="border border-border px-4 py-3 text-foreground">
//           {children}
//         </td>
//       );
//     },
//     blockquote({ children }: any) {
//       return (
//         <blockquote className="border-l-4 border-primary bg-muted/50 pl-6 mt-6 italic text-foreground">
//           {children}
//         </blockquote>
//       );
//     },
//     h1({ children }: any) {
//       return (
//         <h1 className="text-3xl font-bold mb-8 text-foreground ">{children}</h1>
//       );
//     },
//     h2({ children }: any) {
//       return (
//         <h2 className="text-3xl font-semibold mb-6 mt-8 text-foreground">
//           {children}
//         </h2>
//       );
//     },
//     h3({ children }: any) {
//       return (
//         <h3 className="text-2xl font-semibold mb-3 mt-6 text-foreground">
//           {children}
//         </h3>
//       );
//     },
//     h4({ children }: any) {
//       return (
//         <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mb-3 mt-5">
//           {children}
//         </h4>
//       );
//     },
//     p({ children }: any) {
//       return (
//         <p className="leading-relaxed  [&:not(:first-child)]:mt-3">
//           {children}
//         </p>
//       );
//     },
//     ul({ children }: any) {
//       return (
//         <ul className="list-disc  mb-6 space-y-2 text-foreground ml-4">
//           {children}
//         </ul>
//       );
//     },
//     ol({ children }: any) {
//       return (
//         <ol className="list-decimal  mb-6 space-y-2 text-foreground ml-4">
//           {children}
//         </ol>
//       );
//     },
//     li({ children }: any) {
//       return <li className="mb-2 text-foreground">{children}</li>;
//     },
//     strong({ children }: any) {
//       return (
//         <strong className="font-semibold text-foreground">{children}</strong>
//       );
//     },
//     em({ children }: any) {
//       return <em className="italic text-muted-foreground">{children}</em>;
//     },
//     hr({ children }: any) {
//       return <hr className="my-8 border-border" />;
//     },
//   };

//   return (
//     <div className={` ${className}`}>
//       <ReactMarkdown
//         remarkPlugins={[remarkGfm, remarkMath]}
//         rehypePlugins={[rehypeKatex]}
//         components={customComponents}

//       >
//         {content}
//       </ReactMarkdown>
//     </div>
//   );
// }

"use client";

import { CodeBlock, CodeBlockCopyButton } from "./code-block";
import type { ComponentProps, HTMLAttributes } from "react";
import { memo } from "react";
import ReactMarkdown, { type Options } from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { cn } from "@/lib/utils";
import "katex/dist/katex.min.css";
import hardenReactMarkdown from "harden-react-markdown";
import rehypeRaw from "rehype-raw";

/**
 * Parses markdown text and removes incomplete tokens to prevent partial rendering
 * of links, images, bold, and italic formatting during streaming.
 */
function parseIncompleteMarkdown(text: string): string {
  if (!text || typeof text !== "string") {
    return text;
  }

  let result = text;

  // Handle incomplete links and images
  // Pattern: [...] or ![...] where the closing ] is missing
  const linkImagePattern = /(!?\[)([^\]]*?)$/;
  const linkMatch = result.match(linkImagePattern);
  if (linkMatch) {
    // If we have an unterminated [ or ![, remove it and everything after
    const startIndex = result.lastIndexOf(linkMatch[1]);
    result = result.substring(0, startIndex);
  }

  // Handle incomplete bold formatting (**)
  const boldPattern = /(\*\*)([^*]*?)$/;
  const boldMatch = result.match(boldPattern);
  if (boldMatch) {
    // Count the number of ** in the entire string
    const asteriskPairs = (result.match(/\*\*/g) || []).length;
    // If odd number of **, we have an incomplete bold - complete it
    if (asteriskPairs % 2 === 1) {
      result = `${result}**`;
    }
  }

  // Handle incomplete italic formatting (__)
  const italicPattern = /(__)([^_]*?)$/;
  const italicMatch = result.match(italicPattern);
  if (italicMatch) {
    // Count the number of __ in the entire string
    const underscorePairs = (result.match(/__/g) || []).length;
    // If odd number of __, we have an incomplete italic - complete it
    if (underscorePairs % 2 === 1) {
      result = `${result}__`;
    }
  }

  // Handle incomplete single asterisk italic (*)
  const singleAsteriskPattern = /(\*)([^*]*?)$/;
  const singleAsteriskMatch = result.match(singleAsteriskPattern);
  if (singleAsteriskMatch) {
    // Count single asterisks that aren't part of **
    const singleAsterisks = result.split("").reduce((acc, char, index) => {
      if (char === "*") {
        // Check if it's part of a ** pair
        const prevChar = result[index - 1];
        const nextChar = result[index + 1];
        if (prevChar !== "*" && nextChar !== "*") {
          return acc + 1;
        }
      }
      return acc;
    }, 0);

    // If odd number of single *, we have an incomplete italic - complete it
    if (singleAsterisks % 2 === 1) {
      result = `${result}*`;
    }
  }

  // Handle incomplete single underscore italic (_)
  const singleUnderscorePattern = /(_)([^_]*?)$/;
  const singleUnderscoreMatch = result.match(singleUnderscorePattern);
  if (singleUnderscoreMatch) {
    // Count single underscores that aren't part of __
    const singleUnderscores = result.split("").reduce((acc, char, index) => {
      if (char === "_") {
        // Check if it's part of a __ pair
        const prevChar = result[index - 1];
        const nextChar = result[index + 1];
        if (prevChar !== "_" && nextChar !== "_") {
          return acc + 1;
        }
      }
      return acc;
    }, 0);

    // If odd number of single _, we have an incomplete italic - complete it
    if (singleUnderscores % 2 === 1) {
      result = `${result}_`;
    }
  }

  // Handle incomplete inline code blocks (`) - but avoid code blocks (```)
  const inlineCodePattern = /(`)([^`]*?)$/;
  const inlineCodeMatch = result.match(inlineCodePattern);
  if (inlineCodeMatch) {
    // Check if we're dealing with a code block (triple backticks)
    const hasCodeBlockStart = result.includes("```");
    const codeBlockPattern = /```[\s\S]*?```/g;
    const completeCodeBlocks = (result.match(codeBlockPattern) || []).length;
    const allTripleBackticks = (result.match(/```/g) || []).length;

    // If we have an odd number of ``` sequences, we're inside an incomplete code block
    // In this case, don't complete inline code
    const insideIncompleteCodeBlock = allTripleBackticks % 2 === 1;

    if (!insideIncompleteCodeBlock) {
      // Count the number of single backticks that are NOT part of triple backticks
      let singleBacktickCount = 0;
      for (let i = 0; i < result.length; i++) {
        if (result[i] === "`") {
          // Check if this backtick is part of a triple backtick sequence
          const isTripleStart = result.substring(i, i + 3) === "```";
          const isTripleMiddle =
            i > 0 && result.substring(i - 1, i + 2) === "```";
          const isTripleEnd = i > 1 && result.substring(i - 2, i + 1) === "```";

          if (!isTripleStart && !isTripleMiddle && !isTripleEnd) {
            singleBacktickCount++;
          }
        }
      }

      // If odd number of single backticks, we have an incomplete inline code - complete it
      if (singleBacktickCount % 2 === 1) {
        result = `${result}\``;
      }
    }
  }

  // Handle incomplete strikethrough formatting (~~)
  const strikethroughPattern = /(~~)([^~]*?)$/;
  const strikethroughMatch = result.match(strikethroughPattern);
  if (strikethroughMatch) {
    // Count the number of ~~ in the entire string
    const tildePairs = (result.match(/~~/g) || []).length;
    // If odd number of ~~, we have an incomplete strikethrough - complete it
    if (tildePairs % 2 === 1) {
      result = `${result}~~`;
    }
  }

  return result;
}

// Create a hardened version of ReactMarkdown
const HardenedMarkdown = hardenReactMarkdown(ReactMarkdown);

export type ResponseProps = HTMLAttributes<HTMLDivElement> & {
  options?: Options;
  children: Options["children"];
  allowedImagePrefixes?: ComponentProps<
    ReturnType<typeof hardenReactMarkdown>
  >["allowedImagePrefixes"];
  allowedLinkPrefixes?: ComponentProps<
    ReturnType<typeof hardenReactMarkdown>
  >["allowedLinkPrefixes"];
  defaultOrigin?: ComponentProps<
    ReturnType<typeof hardenReactMarkdown>
  >["defaultOrigin"];
  parseIncompleteMarkdown?: boolean;
};

const components: Options["components"] = {
  ol: ({ node, children, className, ...props }) => (
    <ol className={cn("ml-4 list-outside list-decimal", className)} {...props}>
      {children}
    </ol>
  ),
  li: ({ node, children, className, ...props }) => (
    <li className={cn("py-1", className)} {...props}>
      {children}
    </li>
  ),
  ul: ({ node, children, className, ...props }) => (
    <ul className={cn("ml-4 list-outside list-decimal", className)} {...props}>
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
      className={cn("mt-6 mb-2 font-semibold text-3xl leading-relaxed", className)}
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ node, children, className, ...props }) => (
    <h2
      className={cn("mt-6 mb-2 font-semibold text-2xl leading-7", className)}
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ node, children, className, ...props }) => (
    <h3 className={cn("mt-6 mb-2 font-semibold text-xl leading-7", className)} {...props}>
      {children}
    </h3>
  ),
  h4: ({ node, children, className, ...props }) => (
    <h4 className={cn("mt-6 mb-2 font-semibold text-lg leading-relaxed", className)} {...props}>
      {children}
    </h4>
  ),
  h5: ({ node, children, className, ...props }) => (
    <h5
      className={cn("mt-6 mb-2 font-semibold text-base leading-7", className)}
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
  code: CodeBlock,
  p({ children }: any) {
    return (
      <p className="leading-7  [&:not(:first-child)]:mt-3">{children}</p>
    );
  },
};

export const Response = memo(
  ({
    className,
    options,
    children,
    allowedImagePrefixes,
    allowedLinkPrefixes,
    defaultOrigin,
    parseIncompleteMarkdown: shouldParseIncompleteMarkdown = true,
    ...props
  }: ResponseProps) => {
    // Parse the children to remove incomplete markdown tokens if enabled
    const parsedChildren =
      typeof children === "string" && shouldParseIncompleteMarkdown
        ? parseIncompleteMarkdown(children)
        : children;

    return (
      <div
        className={cn(
          "size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
          className
        )}
        {...props}
      >
        <HardenedMarkdown
          components={components}
          rehypePlugins={[rehypeKatex, rehypeRaw]}
          remarkPlugins={[remarkGfm, remarkMath]}
          allowedImagePrefixes={allowedImagePrefixes ?? ["*"]}
          allowedLinkPrefixes={allowedLinkPrefixes ?? ["*"]}
          defaultOrigin={defaultOrigin}
          {...options}
        >
          {parsedChildren}
        </HardenedMarkdown>
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.children === nextProps.children
);
