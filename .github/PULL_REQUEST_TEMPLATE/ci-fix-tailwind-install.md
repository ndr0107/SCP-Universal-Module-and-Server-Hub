---
title: "ci: fix failing npm install by using npm ci and explicit registry"
labels: ''
assignees: ''

---

Summary: The CI build was failing with "No matching version found for tailwindcss@^3.5.4" during npm install. This change forces the runner to use the public npm registry and switches to npm ci for deterministic installs (uses package-lock.json).

Why: Using the public registry avoids registry misdirection in CI, and npm ci ensures consistent installs matching the lockfile.

Testing: After merging, CI should re-run. If npm ci still fails, we should inspect package.json and package-lock.json for an invalid tailwind range and either update the dependency or add an override.

Next steps if still failing:
- Locally run: npm view tailwindcss versions --json and npm why tailwindcss to find the origin.
- Update package.json / package-lock.json to a valid tailwindcss version, or add an "overrides" (npm) / "resolutions" (yarn) entry to force a compatible version, then commit the lockfile.
