/**
 * Server-side execution logic for the Hermes Agent adapter.
 *
 * Spawns `hermes chat -q "..." -Q` as a child process, streams output,
 * and returns structured results to Paperclip.
 *
 * Verified CLI flags (hermes chat):
 *   -q/--query         single query (non-interactive)
 *   -Q/--quiet         quiet mode (no banner/spinner, only response + session_id)
 *   -m/--model         model name (e.g. anthropic/claude-sonnet-4)
 *   -t/--toolsets      comma-separated toolsets to enable
 *   --provider         inference provider (auto, openrouter, nous, etc.)
 *   -r/--resume        resume session by ID
 *   -w/--worktree      isolated git worktree
 *   -v/--verbose       verbose output
 *   --checkpoints      filesystem checkpoints
 *   --yolo             bypass dangerous-command approval prompts (agents have no TTY)
 *   --source           session source tag for filtering
 */
import type { AdapterExecutionContext, AdapterExecutionResult } from "@paperclipai/adapter-utils";
import { runChildProcess } from "@paperclipai/adapter-utils/server-utils";
type ChildProcessResult = Awaited<ReturnType<typeof runChildProcess>>;
type RetryableStatusCode = 503 | 529;
export declare const HERMES_RETRY_DELAYS_MS: readonly [2000, 4000, 8000];
export declare function getRetryableHermesStatusCode(result: Pick<ChildProcessResult, "exitCode" | "signal" | "timedOut" | "stdout" | "stderr">): RetryableStatusCode | null;
interface HermesRetryOptions {
    run: () => Promise<ChildProcessResult>;
    onRetryLog?: (message: string) => Promise<void> | void;
    sleep?: (ms: number) => Promise<void> | void;
    retryDelaysMs?: readonly number[];
}
export declare function runHermesCommandWithRetries(options: HermesRetryOptions): Promise<ChildProcessResult>;
export declare function execute(ctx: AdapterExecutionContext): Promise<AdapterExecutionResult>;
export {};
//# sourceMappingURL=execute.d.ts.map