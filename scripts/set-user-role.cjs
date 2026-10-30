/* eslint-disable @typescript-eslint/no-require-imports */

const path = require("node:path");
const dotenv = require("dotenv");
const { cert, getApps, initializeApp } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");

dotenv.config({ path: path.resolve(__dirname, "..", ".env.local") });

const roles = new Set(["super_admin", "branch_manager", "student"]);
const [email, role, branchId, regId] = process.argv.slice(2);

if (!email || !roles.has(role)) {
  console.error("Usage: node scripts/set-user-role.cjs <email> <super_admin|branch_manager|student> [branchId] [regId]");
  process.exit(1);
}

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

if (!projectId || !clientEmail || !privateKey) {
  console.error("Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY first.");
  process.exit(1);
}

const app = getApps()[0] || initializeApp({
  credential: cert({ projectId, clientEmail, privateKey }),
  projectId,
});

async function main() {
  const auth = getAuth(app);
  const user = await auth.getUserByEmail(email);
  const existing = user.customClaims || {};
  const { role: _oldRole, branchId: _oldBranch, regId: _oldRegId, ...otherClaims } = existing;
  const claims = { ...otherClaims, role };

  if (role === "branch_manager" && branchId) claims.branchId = branchId;
  if (role === "student" && regId) claims.regId = regId;

  await auth.setCustomUserClaims(user.uid, claims);
  console.log(`Set role '${role}' for ${user.email} (${user.uid}).`);
  if (claims.branchId) console.log(`branchId: ${claims.branchId}`);
  if (claims.regId) console.log(`regId: ${claims.regId}`);
}

main().catch((error) => {
  console.error("Unable to set Firebase Auth role:", error.message);
  process.exitCode = 1;
});
