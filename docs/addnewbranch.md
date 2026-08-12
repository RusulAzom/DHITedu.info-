# Adding a New Branch

This guide explains how to add a new DHIT branch to the website. It is written for both **humans** (step-by-step) and **AI agents** (machine-actionable checklist at the end).

A branch is exposed at the URL `/branch/<slug>` (e.g. `/branch/bholadistrict`). There are two supported implementations; pick one and stay consistent.

---

## 1. Information you must collect

Before creating any files, gather the following for the new branch:

| Field | Required | Where it goes | Notes |
|-------|----------|---------------|-------|
| `slug` (branch id) | ✅ | route + filenames | lowercase letters, numbers, `-` and `_` only (regex `^[a-z0-9_-]+$`). Example: `bholadistrict`. Must match across every file. |
| Branch full name | ✅ | `branch.name` | English full name, e.g. `Dream Health and Information Technology - Bhola Branch`. |
| Short name | ✅ | `branch.shortName` | e.g. `DHIT Bhola`. |
| Tagline | ✅ | `branch.tagline` | Bengali admission/marketing line. |
| Govt approved | ⬜ | `branch.govtApproved` | `true`/`false`. If true, also provide reg no. |
| Govt reg no | ⬜ | `branch.govtRegNo`, `branch.govtRegNoShort` | Shown as "Govt Approved: ..." badge. |
| Director name | ✅ | `director.name` | |
| Director designation | ✅ | `director.designation` | e.g. `Director (DHIT Bhola)`. |
| Director email | ✅ | `director.email` | |
| Director phones | ✅ | `director.phonePrimary`, `director.phoneSecondary[]` | |
| Director photo | ⬜ | `director.photo` + `src/data/imgs/` | Put image in `src/data/imgs/`. The component `BranchDetailView` also hard-imports `directorImg` (see Section 4). |
| Address (BN) | ✅ | `contact.address` | |
| Address (EN) | ✅ | `contact.addressEn` | Used for the Google Maps link. |
| District | ✅ | `contact.district` | |
| Contact phones | ✅ | `contact.phones[]` | |
| Contact email | ✅ | `contact.email` | |
| Admission status | ✅ | `admission.status`, `admission.statusEn` | e.g. `ভর্তি চলছে`. |
| Admission announcement | ⬜ | `admission.announcement` | |
| Duration options | ✅ | `admission.durationOptions[]`, `courseDurations[]` | e.g. `["3 মাস","6 মাস","1 বছর","2 বছর"]`. |
| Courses | ✅ | `availableCourses[]` | Each: `{ code, name, category }`. |
| Student lists | ⬜ | `studentList.tabs[]` | Google Docs "Publish to web" `url` + `embedUrl` per batch. |
| SEO | ✅ | `seo.slug`, `seo.metaTitle`, `seo.metaDescription` | `seo.slug` must equal the branch `slug`. |

---

## 2. Choose an implementation

### Option A — Inline data (used by chandina, dhakacentral, dinajpur-khanshama, kishorgonj-nilphamari, monirampur, online-batch)

Create `src/app/branch/<slug>/page.jsx` and hardcode the data object inside it:

```jsx
import BranchDetailView from "@/components/BranchDetailView";

const data = {
  branch: { id: "<slug>", name: "...", shortName: "...", tagline: "..." },
  director: { name: "...", designation: "...", email: "...", phonePrimary: "...", phoneSecondary: [], photo: "" },
  contact: { address: "...", addressEn: "...", district: "...", phones: [], email: "..." },
  admission: { status: "...", statusEn: "...", announcement: "", durationOptions: [] },
  availableCourses: [{ code: "RMP", name: "...", category: "Paramedical" }],
  courseDurations: [],
  studentList: { title: "Student Lists", titleBn: "...", previewType: "googleDocsEmbed", tabs: [] },
  seo: { slug: "<slug>", metaTitle: "...", metaDescription: "..." },
};

export const metadata = {
  title: "..." /* Bengali/English title */,
  description: "..." /* Bengali description */,
};

export default function BranchPage() {
  return <BranchDetailView data={data} />;
}
```

### Option B — External JSON file (used by bholadistrict)

1. Create `src/data/branch/<slug>.json` with the **same shape** as `src/data/branch/bholadistrict.json`.
2. Create `src/app/branch/<slug>/page.jsx` that imports it:

```jsx
import BranchDetailView from "@/components/BranchDetailView";
import data from "@/data/branch/<slug>.json";

export const metadata = {
  title: "..." /* Bengali/English title */,
  description: "..." /* Bengali description */,
};

export default function BranchPage() {
  return <BranchDetailView data={data} />;
}
```

> The dynamic route `src/app/branch/[branchId]/page.jsx` only loads JSON files via `@/data/branch/${branchId}.json`. If you use **Option A (inline)**, do NOT rely on the dynamic route — the static `page.jsx` takes precedence. If you use **Option B**, the JSON file is what gets loaded.

---

## 3. Register the branch in navigation (REQUIRED)

A new branch page will be unreachable unless you add it to the hardcoded navigation lists. Add a `{ label: "<Bengali name>", value: "<slug>" }` (or `href: "/branch/<slug>"`) entry to **all** of the following:

1. `src/components/Header.jsx` — `branchOptions` array (lines ~9-18). Drives the header branch dropdown (desktop + mobile drawers).
2. `src/components/QuickActions.jsx` — `branchOptions` array (lines ~7-16). Drives the home-page branch selector dropdown.
3. `src/components/Footer.jsx` — `branchLinks` array (lines ~12-20). Footer branch links.
4. `src/app/branches/page.js` — `branchLocations` array (lines ~3-10). The "শাখা সমূহ" (All Branches) listing page.

The `value`/`href` must be exactly `/branch/<slug>` and must match the `slug` used in Section 2.

> Note: `src/components/BottomNav.jsx` does **not** list branches, so no change is needed there.

---

## 4. Director photo (IMPORTANT if using Option B / JSON)

`src/components/BranchDetailView.jsx` currently hard-imports one specific image:

```jsx
import directorImg from "@/data/imgs/maksudurdirectorbhola.png";
```

The component renders `directorImg` (the imported file) rather than `director.photo` for the `<Image>` source. To show a different director's photo you must:

- Place the new photo in `src/data/imgs/`, and
- Update the `directorImg` import in `BranchDetailView.jsx` to point at the new file, OR change the component to use `director.photo` instead of the hard-imported `directorImg`.

If you do not change this, every branch will display the Bhola director's photo. (This is a known tech debt item.)

---

## 5. Result / student lookup (only if the branch has students)

Student result data lives in `src/data/result/student/student_info.json` under the `branches` and `students` tables. Each student row has a `branch_id` that must match a `branches.branch_id` entry. If your branch has students:

- Ensure the branch exists in the `branches` table of `student_info.json` with a `branch_id`.
- Ensure student rows reference that `branch_id`.

The result search dropdown (`src/app/result/page.jsx`) and `ResultCheckForm` are built dynamically from that JSON, so no code change is needed there — only the data.

---

## 6. Verify

1. `npm run build` (or `npm run dev` and open `/branch/<slug>`).
2. Confirm the page renders with correct name, director, contact, courses.
3. Confirm the branch appears in Header dropdown, QuickActions dropdown, Footer, and `/branches`.
4. Check the director photo is correct (Section 4).
5. Run `npm run lint`.

---

## 7. AI agent checklist

When asked to "add a new branch <slug> with data <D>":

1. Decide inline (Option A) or JSON (Option B). Recommend Option B for consistency with `bholadistrict`.
2. Create `src/app/branch/<slug>/page.jsx` (and `src/data/branch/<slug>.json` for Option B) using the exact data shape from `bholadistrict.json`. Set `seo.slug === <slug>` and `branch.id === <slug>`.
3. Add `{ label, value: "<slug>" }` to `branchOptions` in BOTH `src/components/Header.jsx` and `src/components/QuickActions.jsx`.
4. Add `{ label, href: "/branch/<slug>" }` to `branchLinks` in `src/components/Footer.jsx` and `branchLocations` in `src/app/branches/page.js`.
5. If a director photo is provided: add it to `src/data/imgs/` and update the `directorImg` import (or refactor `BranchDetailView.jsx` to use `director.photo`).
6. If students exist: ensure the branch + `branch_id` are present in `src/data/result/student/student_info.json`.
7. Slug MUST match regex `^[a-z0-9_-]+$` everywhere.
8. Run `npm run lint` and `npm run build`; do not commit unless asked.
