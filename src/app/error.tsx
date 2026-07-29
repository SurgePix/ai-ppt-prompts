"use client";

import { Button } from "antd";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex items-center justify-center min-h-screen p-8 bg-background">
      <div className="flex flex-col items-center w-full max-w-2xl p-8">
        <h2 className="text-xl mb-4">出错了</h2>
        <div className="p-4 w-full rounded bg-muted overflow-auto mb-6">
          <pre className="text-sm text-muted-foreground whitespace-break-spaces">
            {error.message}
          </pre>
        </div>
        <Button type="primary" onClick={reset}>
          重试
        </Button>
      </div>
    </div>
  );
}
