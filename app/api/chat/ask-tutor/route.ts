import { streamText, UIMessage, convertToModelMessages } from "ai";
import { gateway } from "@ai-sdk/gateway";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const {
    messages,
  }: {
    messages: UIMessage[];
  } = await req.json();

  const result = streamText({
    model: gateway("openai/gpt-4o-mini"),
    messages: convertToModelMessages(messages),
    system: `You are helpful assistant`,
  });

  // send sources and reasoning back to the client
  return result.toUIMessageStreamResponse({
    sendSources: true,
    sendReasoning: true,
  });
}
