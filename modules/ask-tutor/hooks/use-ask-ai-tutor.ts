import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useRef, useState } from "react";

export const askAiTutor = () => {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<FileList | undefined>(undefined);
  const [trigger, setTrigger] = useState<"learn" | "test" | "career" | "job">(
    "learn"
  );

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat/ask-tutor",
    }),
  });
  const convertFilesToDataURLs = async (
    files: FileList
  ): Promise<
    { type: "file"; filename: string; mediaType: string; url: string }[]
  > => {
    return Promise.all(
      Array.from(files).map(
        (file) =>
          new Promise<{
            type: "file";
            filename: string;
            mediaType: string;
            url: string;
          }>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
              resolve({
                type: "file",
                filename: file.name,
                mediaType: file.type,
                url: reader.result as string, // Data URL
              });
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
          })
      )
    );
  };

  const handleSubmit = async () => {
    if (files && files.length > 0) {
      const fileParts =
        files && files.length > 0 ? await convertFilesToDataURLs(files) : [];

      sendMessage({
        role: "user",
        parts: [{ type: "text", text: input }, ...fileParts],
      });
      setFiles(undefined);
      setInput("");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } else if (input.trim()) {
      sendMessage(
        { text: input },

        {
          body: {},
        }
      );
      setInput("");
    }
  };

  const onSelectTrigger = (value: typeof trigger) => {
    setTrigger(value);
  };

  return {
    open,
    setOpen,
    messages,
    onSelectTrigger,
    setInput,
    trigger,
    fileInputRef,
    files,
    setFiles,
    handleSubmit,
    input,
    status,
  };
};
