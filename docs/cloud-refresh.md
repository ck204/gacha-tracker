# Cloud research → candidate → validation → main

This replaces the old local-execution requirement. The PC may be OFF. Research still
runs in the existing external scheduled cloud task. GitHub Actions supplies Node, tests,
git and publication; the research chat only needs its GitHub read/branch/file-write tools.
No personal access token, new paid service, local process or new research schedule is needed.

## Instructions for each scheduled or authorized manual refresh

1. Read latest main and the current CLAUDE.md/leak-verification runbook. Record main SHA.
2. Research sources, review both leaks and leakReview, and build one complete candidate
   data.js. Preserve FGO, IDs, existing game order, and confirmed evidence. Set lastUpdated
   to the actual research date in Asia/Singapore. Do not invent dates or verified checks.
3. With the GitHub connector/API, create a unique branch from that exact main SHA:
   `refresh-candidate/YYYY-MM-DD-unique-run-id` (replace placeholders). Write ONLY
   data.js on this branch in a single commit. Do not write main or modify workflow code.
   Branch creation alone may produce a harmless rejected run; the data commit triggers
   its own run. Identify the run by the full candidate commit SHA, not simply the latest run.
4. This push automatically starts **Validate and publish cloud refresh**. The chat does
   NOT run Node locally, request an execution-environment handoff, or decline submission
   because shell commands are unavailable. Remote candidate staging is authorized.
5. Read Actions status/logs for that SHA. Wait for completion if tools allow; otherwise
   report “candidate submitted, cloud validation pending” and link the candidate/run.
   Do not claim a live refresh until the publication step reports a main SHA.
6. On success, report the main SHA, held claims, and Pages build result. No extra write
   by the research task is needed. Leave the candidate branch for audit; do not merge it.

The candidate must be a one-parent commit changing only data.js, based on a commit
already in main history. If main data changed since that parent, it is stale and rejected.
Mirror-only main updates are compatible. The runner uses the latest main's scripts,
not candidate code, and parses strict JSON before any VM-based rendering test.

## What the runner checks and publishes

- Character/source evidence, aliases, reruns, announced-character overlap and status history.
- Existing rendering/wishlist regressions, strict data parsing and whitespace checks.
- Current research date, valid banner date ranges, version regression and unchanged FGO.
- Exact candidate bytes before publication and unchanged main after validation.
- Ordinary non-force push, which rejects a concurrent main update after the final check.

Only data.js is committed to main after all checks pass. A retry with data already on
main is a no-op, not another data commit. The bot explicitly calls the Pages build API
because bot-token pushes do not themselves trigger normal push workflows. See
[GitHub's Pages build API](https://docs.github.com/en/rest/pages/pages#request-a-github-pages-build).
The existing branch-based Pages configuration is retained.

## Failures and retries

- Validation failure: inspect the actual log. Correct the candidate and submit one
  fresh single-commit branch based on latest main. No direct-main workaround.
- Main moved during validation: rerun the same workflow. If only mirrors changed,
  it can validate again. If data changed, rebuild the proposal against latest main.
- Pages request failed AFTER publication: main already contains the validated data.
  Rerun the same candidate; it will not create another commit and can retry Pages.
- Research source unavailable: keep the claim pending with its reason; do not fabricate
  evidence to satisfy a validator. An empty published leak list is valid.
- Missing GitHub branch/write tools: report that exact cloud connector limitation.
  Do not claim local execution is required, and do not silently change the research schedule.

At most one queued run may survive GitHub concurrency replacement. Always check the
run corresponding to the submitted SHA; a cancelled candidate may be resubmitted/rerun.

## Cloud-only diagnostic run

Use Actions → **Validate and publish cloud refresh** → Run workflow on **main**.
Leave candidate_sha empty and dry_run true to validate the current main snapshot with
no publication. For a real staged candidate supply its full 40-character SHA; use
dry_run true to test without publishing, or false to validate and publish. Push-triggered
candidate runs publish automatically when valid. Dispatch requires Actions permission;
normal candidate submission only needs branch/file-write access.

The external cloud task's existing timing is unchanged. It must follow the latest
repository instructions instead of an old hard-coded “direct main write/local tests”
prompt. This repository does not own or reconfigure that external scheduler.
