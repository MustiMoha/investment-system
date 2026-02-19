#!/usr/bin/env node
/**
 * Creates a ZIP of the project for sharing, excluding dev/build artifacts and secrets.
 * Run from project root: npm run zip
 * Output: investment-system-share.zip in the project root.
 */

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const root = path.resolve(__dirname, "..");
const outName = "investment-system-share.zip";
const outPath = path.join(root, outName);

// Prune these directories (same as .gitignore) so they're not included.
const pruneDirs = [
  "./node_modules",
  "./.next",
  "./out",
  "./build",
  "./data",
  "./.vercel",
  "./.git",
  "./.yarn",
];

// find . -type d \( -path ./node_modules -o -path ./.next ... \) -prune -o -type f -not -name .DS_Store -not -name "*.zip" -print
const pruneExpr = pruneDirs.map((d) => `-path ${d}`).join(" -o ");
const findCmd = `find . -type d \\( ${pruneExpr} \\) -prune -o -type f -not -name ".DS_Store" -not -name "*.zip" -not -name "*.tsbuildinfo" -not -name "next-env.d.ts" -print`;

if (fs.existsSync(outPath)) fs.unlinkSync(outPath);

try {
  const list = execSync(findCmd, { cwd: root, encoding: "utf-8" })
    .trim()
    .split("\n")
    .filter((line) => line.length > 0 && !line.includes(".env"));
  if (list.length === 0) {
    console.error("No files to zip. Check exclusions.");
    process.exit(1);
  }
  const args = list.map((f) => `"${f.replace(/"/g, '\\"')}"`).join(" ");
  execSync(`zip -r "${outPath}" ${args}`, { cwd: root, stdio: "inherit" });
  console.log("\nCreated:", outPath);
} catch (e) {
  console.error("ZIP failed:", e.message);
  process.exit(1);
}
