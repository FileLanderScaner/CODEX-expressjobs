import { execFileSync } from "node:child_process";

const patterns = [
  "sk_live_[A-Za-z0-9]",
  "sk-proj-[A-Za-z0-9]",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY=.*[A-Za-z0-9_-]{40,}",
];

const files = execFileSync("git", ["ls-files", "--cached", "--others", "--exclude-standard"], { encoding: "utf8" })
  .split("\n")
  .filter(Boolean)
  .filter((file) => !file.endsWith(".lock") && file !== ".env.example")
  .filter(
    (file) =>
      !file.startsWith(".next/") &&
      !file.startsWith("node_modules/") &&
      !file.startsWith("android/.gradle/") &&
      !file.startsWith("android/app/build/") &&
      !file.startsWith("android/build/"),
  );

let failed = false;

for (const pattern of patterns) {
  for (let index = 0; index < files.length; index += 200) {
    const chunk = files.slice(index, index + 200);
    if (!chunk.length) {
      continue;
    }
    try {
      const output = execFileSync("git", ["grep", "-n", "-I", "-E", pattern, "--", ...chunk], {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
      });
      if (output.trim()) {
        failed = true;
        console.error(`Potential secret pattern found: ${pattern}`);
        console.error(output);
      }
    } catch (error) {
      if (error.status !== 1) {
        throw error;
      }
    }
  }
}

if (failed) {
  process.exit(1);
}

console.log("Secret scan passed.");
