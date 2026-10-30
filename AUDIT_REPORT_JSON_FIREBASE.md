# DHITedu.info - JSON Data Audit Report
## For News Backend Team (Firebase Automation)

**Report Date:** 2024
**Target:** Automate JSON data flow with Firebase Firestore
**Scope:** Website content, Student information, Result data

---
## 1. EXECUTIVE SUMMARY

The DHITedu.info website currently relies on **static JSON files** embedded in the source code to render branch information, student records, and examination results. This audit identifies critical areas that need transformation for Firebase automation, enabling dynamic content updates without code redeployment.

**Current State:** JSON files are checked into Git and baked into the Next.js application at build time.

**Target State:** JSON data fetched from Firebase Firestore at runtime, with automatic content sync capabilities.
## 2. CURRENT JSON DATA STRUCTURE ANALYSIS

### 2.1 Branch Configuration JSON (`src/data/branch/*.json`)

**Files:** `bholadistrict.json`, `monirampur.json` (and templates for other branches)

**Structure:**
```json
{
  "branch": { "id", "name", "shortName", "tagline", "govtApproved", "govtRegNo", ... },
  "director": { "name", "designation", "email", "phonePrimary", "phoneSecondary", "photo" },
  "contact": { "address", "addressEn", "district", "phones", "email" },
  "admission": { "status", "statusEn", "announcement", "durationOptions" },
  "availableCourses": [{ "code", "name", "category" }],
  "courseDurations": ["..."],
  "studentList": { "title", "titleBn", "previewType", "tabs[]" },
  "seo": { "slug", "metaTitle", "metaDescription" }
}
```

**How it's consumed:**
- `BranchDetail.jsx` dynamically imports: `import mod from `@/data/branch/${branchId}.json``
- Data passed to `BranchDetailView` component
- SEO metadata generated from `seo` field
- Branch navigation listed in Header, QuickActions, Footer (hardcoded slugs)

**Issues:**
- ❌ **Build-time only:** Changes require Git commit + redeploy
- ❌ **Duplicate navigation config:** Branch slugs must be updated in 4+ component files
- ❌ **Hardcoded director photo import:** `BranchDetailView.jsx` imports specific image rather than using `director.photo` from JSON
- ⚠️ **Inconsistent course categories:** Different branches use different category naming (Paramedical vs Medical vs Alternative Medicine)

### 2.2 Student Result Data (`src/data/result/student/student_info.json`)

**Source:** PHPMyAdmin export of MySQL database `bustanas_drms`

**Structure (parsed by `parseTables()`):**
- `branches` table: `branch_id`, `name`, `address`, `administrator`
- `courses` table: `crs_id`, `name`, `full_form`, `dpt_id`
- `students` table: `id`, `name`, `reg_id`, `roll`, `f_name`, `m_name`, `picture`, `branch_id`, `crs_id`, ...
- `grade` table: `g_id`, `reg_id`, `crs_id`, `Exam`, `season`, `1st`, `2nd`, `3rd`, `grade`, `result`

**How it's consumed:**
1. `resultDataHelper.js` `loadTables()` reads the JSON file synchronously
2. `parseTables()` extracts `branches`, `courses`, `students`, `grade` tables
3. `resultDataClient.js` `searchResult()` performs lookups by `reg_id`
4. `ResultPage.jsx` renders search form + `ResultDisplayCard`

**Issues:**
- ❌ **7,240+ lines of raw database export** - Mostly irrelevant metadata (PHPMyAdmin headers, database version)
- ❌ **No client-side caching strategy** - `loadTables()` reads file on every server request
- ❌ **No pagination** - All students loaded at once
- ❌ **No authentication/authorization** - Anyone can search any student record
- ❌ **Picture paths hardcoded to local filesystem** - `/result/pics/filename.png`
- ❌ **Grade fields inconsistent:** `g.Exam`, `g.grade`, `g.result` - mixed naming conventions

### 2.3 Course Data (`src/lib/courseData.js`)

**Structure:** Hardcoded array of `{ slug, title, duration }` with Bangla/English mixed

**Consumed by:** Branch page components for course listings

**Issues:**
- ⚠️ **Duplicates data** from `availableCourses` in branch JSON files
- ⚠️ **No category field** for filtering/grouping
---
## 3. FIREBASE AUTOMATION RECOMMENDATIONS

### 3.1 Firebase Firestore Data Model

**Recommended Structure:**

```
collection: "dhit-branches"
  document: "<branchSlug>"  // e.g., "bholadistrict", "monirampur"
    fields:
      branch:        { id, name, shortName, tagline, govtApproved, govtRegNo }
      director:      { name, designation, email, phonePrimary, phoneSecondary, photoUrl }
      contact:       { address, addressEn, district, phones[], email }
      admission:     { status, statusEn, announcement, durationOptions: [] }
      availableCourses: [{ code, name, category }]
      courseDurations: []
      studentList:   { title, titleBn, previewType, tabs: [{ id, label, labelBn, year, url, embedUrl }] }
      seo:           { slug, metaTitle, metaDescription }
      updatedAt:     timestamp

collection: "dhit-students"
  document: "<regId>"  // Use registration number as document ID
    fields:
      name: string
      reg_id: string
      roll: string
      father: string
      mother: string
      picture_url: string
      branch_id: string
      crs_id: string
      course_code: string
      course_name: string
      branch_name: string
      results: array of {
        g_id, crs_id, exam, season, 1st, 2nd, 3rd, grade, result
      }
      createdAt: timestamp

collection: "dhit-results"
  collection: "search-index"
    fields: same as dhit-students (for full-text search)
```

### 3.2 Migration Benefits

| Current | Firebase | Improvement |
|---------|----------|-------------|
| Static JSON files | Real-time data | Update branch info without redeploy |
| Git-dependent | CDN-synced | Faster global deployment |
| Hardcoded navigation | Auto-generated from Firestore | No more stale branch links |
| Manual SEO updates | CMS-driven | Content editors control metadata |
| Database JSON export | Structured documents | Query-optimized data |

### 3.3 Implementation Phases

**Phase 1: Firebase Setup & Data Ingestion**
- [ ] Initialize Firebase project (already configured at `src/config/firebase.js`)
- [ ] Create Firestore indices for `dhit-branches` and `dhit-students`
- [ ] Develop data import script to convert existing JSON → Firebase documents
- [ ] Set up service account credentials for backend sync

**Phase 2: Frontend Integration**
- [ ] Replace static JSON imports with `useCollectionData()` or `useDocQuery()`
- [ ] Implement fallback for offline/missing data
- [ ] Update `BranchDetail.jsx` to fetch branch data from Firestore
- [ ] Update `ResultPage.jsx` to fetch student records from Firestore
- [ ] Add loading/error states for all data fetches

**Phase 3: Admin/UIs**
- [ ] Build Firebase Functions or Cloud Tools for content managers
- [ ] Create branch CRUD interface
- [ ] Create student result search interface (with proper auth)
- [ ] Implement director photo URL management (Cloud Storage)

**Phase 4: Deprecate Old JSON**
- [ ] Remove `require('fs')` synchronous reads from `resultDataHelper.js`
- [ ] Remove dynamic JSON imports from `BranchDetail.jsx`
- [ ] Delete `src/data/branch/*.json` files from repo (keep as backup)
- [ ] Remove `src/data/result/student/student_info.json` or mark as deprecated
---
---
---
## 6. RISK ASSESSMENT

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Data loss during migration | Medium | High | Backup existing JSON files; run import script in staging first |
| Broken branch pages during transition | Medium | Medium | Feature flag: `useFirebaseBranchData`; keep JSON fallback for 2 releases |
| Student privacy violations | Low | Critical | Strict Firestore security rules; no PII without consent |
| SEO ranking drop during migration | Medium | Medium | Implement 301 redirects from old `/branch/<slug>` URLs |
| Performance regression | Low | Low | Use Firestore caching; measure before/after benchmarks |
| Team skill gap with Firestore | Medium | Medium | Training session + pair programming during migration |

## 7. SUCCESS METRICS

- [ ] **0 code redeploys** needed to update branch name/tagline/admission status
- [ ] **Branch pages load** in < 200ms from Firestore (global via CDN)
- [ ] **Result search** returns in < 500ms with proper security rules
- [ ] **Content managers** can update branch info via Firebase Console without developer help
- [ ] **All 7 branch JSON files** deprecated and removed from repository
- [ ] **Student data** access restricted to authenticated users only
- [ ] **Zero critical bugs** in first 2 weeks post-migration

## 8. NEXT STEPS

1. **Team alignment:** Review this report and confirm Firebase project ownership
2. **Credentials:** Provide service account key or use Google Cloud authentication
3. **Data freeze:** Freeze current JSON data during migration window
4. **Staging migration:** Run import script to staging Firebase project first
5. **Gradual rollout:** Migrate one branch at a time (start with bholadistrict/monirampur which already have JSON)
6. **Full production:** Switch all branches and result search to Firebase
7. **Cleanup:** Remove deprecated JSON files and helper functions

---
*Report prepared for the News Backend Team - Firebase Automation Initiative*
*For questions or clarification, contact the frontend team leading the DHITedu.info codebase*
## 5. BACKEND TEAM ACTION ITEMS (Firebase Implementation)

### 5.1 Immediate (Sprint 1)

- [ ] **Set up Firestore structure** matching the recommended data model
- [ ] **Create data import script** (`npm run import:firebase`) that reads current JSON and writes to Firebase
- [ ] **Update `src/config/firebase.js`** with proper credentials (currently has placeholder config)
- [ ] **Branch pages:** Migrate `BranchDetail.jsx` to fetch from `dhit-branches` collection
- [ ] **Update navigation:** Remove hardcoded branch lists from Header, QuickActions, Footer - generate from Firestore

### 5.2 Short-term (Sprint 2-3)

- [ ] **Student result search:** Migrate `ResultPage.jsx` to use Firestore `dhit-students` collection
- [ ] **Implement security rules** for student data access (read: authenticated users only)
- [ ] **Cloud Storage setup** for director/student photos
- [ ] **Admin interface** for content managers (Firebase Console custom fields or simple web UI)

### 5.3 Long-term (Sprint 4+)

- [ ] **Deprecate all `src/data/*.json` files** except as backup/export
- [ ] **Remove `loadTables()` and `parseTables()`** from `resultDataHelper.js`
- [ ] **Remove dynamic JSON imports** from `BranchDetail.jsx`
- [ ] **Full-text search implementation** using Firebase Algolia or similar
- [ ] **Analytics integration** for result search metrics
## 4. SPECIFIC AUDIT FINDINGS & REMEDIATION

### 4.1 Website Content (Branch Information)

**Current Problems:**
1. **4+ files must be updated** when adding/renaming a branch:
   - `src/data/branch/<slug>.json` (data)
   - `src/app/branch/<slug>/page.jsx` (page component)
   - `src/components/Header.jsx` (branchOptions)
   - `src/components/QuickActions.jsx` (branchOptions)
   - `src/components/Footer.jsx` (branchLinks)
   - `src/app/branches/page.js` (branchLocations)

2. **Director photo bug:** `BranchDetailView.jsx` hard-imports `directorImg from "@/data/imgs/maksudurdirectorbhola.png"` - always shows Bhola director regardless of branch.

3. **SEO metadata duplicated:** `seo.slug` must match branch slug exactly - easy to mismatch.

**Firebase Remediation:**
- Single document per branch in `dhit-branches` collection
- Navigation generated automatically from Firestore collection snapshot
- Director photo stored in Cloud Storage with URL in Firestore
- SEO slug validated at write time (enforce regex `^[a-z0-9_-]+$`)

### 4.2 Student Information

**Current Problems:**
1. **7,240-line JSON bloat:** Only ~350 students have meaningful data; rest is PHPMyAdmin export metadata
2. **Picture paths broken on deployment:** `/result/pics/filename.png` assumes local filesystem
3. **No rate limiting:** Result search endpoint has no protection against abuse
4. **Mixed gender titles:** Some records have `mr`, `mrs`, `mrs` prefixes inconsistently
5. **Grade field chaos:** `g.Exam`, `g.grade`, `g.result` - three different fields for same concept

**Firebase Remediation:**
- Individual student documents by `reg_id` - only load what's needed
- Cloud Storage for student photos with signed URLs
- Security rules to restrict read access to verified users only
- Normalized grade field: single `grade` field with values: "A", "A+", "Pass", "Fail", etc.
- Optional `examSeason` field combining `exam` + `season`

### 4.3 Result Data

**Current Problems:**
1. **Search depends on complete table load:** `parseTables()` must read entire JSON before any search
2. **No seasonal filtering UI:** Season options populated from data, but no server-side filtering
3. **Roll number validation:** `ResultCheckForm` accepts roll but client-side only warns if mismatch
4. **No result pagination:** All matching grades returned at once

**Firebase Remediation:**
- Group results by student document, not flat table
- Server-side filtering by `branch_id`, `crs_id`, `season`
- Pagination at client or server level
- Real-time updates if student grades change