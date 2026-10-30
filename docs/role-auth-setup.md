# DHITedu authentication and JSON data

## Data boundary

Firebase is used only for Firebase Authentication, role custom claims, session creation, and session revocation. Public branch pages continue to import `src/data/branch/*.json`; course pages continue to use `src/lib/courseData.js`; student results continue to use `src/data/result/student/student_info.json` through `src/utils/resultDataHelper.js`. Dashboard modules read the same JSON files on the server and return allowlisted fields to the page.

There is no Firestore lookup in the login or dashboard authorization path, and no branch, student, or result content is copied to Firestore.

## Firebase Auth custom claims

Assign roles as Firebase Auth custom claims. Supported roles are `super_admin`, `branch_manager`, and `student`. Optional dashboard mapping claims:

- `branchId`: a branch slug or `branch.id` found in a checked-in branch JSON file.
- `regId`: the student's `reg_id` in `src/data/result/student/student_info.json`.

Set the public Firebase web configuration variables `NEXT_PUBLIC_FIREBASE_API_KEY`, `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`, `NEXT_PUBLIC_FIREBASE_PROJECT_ID`, `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`, `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`, `NEXT_PUBLIC_FIREBASE_APP_ID`, and `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`. Set these in the repository-root `.env.local` for local development and in the deployment environment before building.

The login API also requires the server-only Firebase Admin variables `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, and `FIREBASE_PRIVATE_KEY`. Never expose the service-account private key using a `NEXT_PUBLIC_` name. These Admin credentials are distinct from the public web configuration. Enable Email/Password in Firebase Authentication.

Use the Admin SDK script to assign a claim set:

```powershell
node scripts/set-user-role.cjs admin@example.com super_admin
node scripts/set-user-role.cjs manager@example.com branch_manager bholadistrict
node scripts/set-user-role.cjs student@example.com student "" 11135120001
```

The script preserves unrelated custom claims and replaces the DHITedu role/mapping claims. After a role change, the user must sign in again to receive a token containing the latest claims.

Login accepts a Firebase Auth email. For username login, store the Firebase Auth email as `<username>@dhitedu.info` (or set `FIREBASE_USERNAME_DOMAIN` on the server to another domain); the username field is the email local part.

## Session and route protection

The server verifies Firebase ID tokens, creates a five-day HTTP-only Firebase session cookie, verifies that cookie and reads the role from its signed custom claims, and revokes it at sign out. Protected dashboard pages enforce their role on the server. `src/proxy.ts` only redirects requests without a cookie; server authorization remains the security boundary.

These features require a running Next.js server. Static export is disabled. Deploy to a Next.js server host and configure the Firebase server environment variables there.

## Safe dashboard mapping

The branch manager's `branchId` claim is matched against branch slugs and `branch.id` values in the JSON manifest in `src/lib/dashboardData.ts`. The student's `regId` claim is normalized with the same `cleanReg()` helper used by the existing result flow and matched against JSON `reg_id`; only name, registration ID, roll, branch, course, and picture are sent to the dashboard. Passwords, emails, phone numbers, and other student fields are not passed to the UI.
