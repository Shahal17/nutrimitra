CREATE TYPE "Role" AS ENUM ('patient', 'caregiver', 'family', 'admin');

CREATE TABLE "User" (
  "id" TEXT PRIMARY KEY,
  "role" "Role" NOT NULL,
  "name" TEXT NOT NULL,
  "email" TEXT UNIQUE NOT NULL,
  "verificationStatus" TEXT NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Patient" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT UNIQUE NOT NULL,
  "demographics" JSONB NOT NULL,
  "carePlan" TEXT NOT NULL,
  "allergies" JSONB NOT NULL,
  "comorbidities" JSONB NOT NULL,
  "emergencyContacts" JSONB NOT NULL,
  "consent" JSONB NOT NULL
);

CREATE TABLE "Visit" (
  "id" TEXT PRIMARY KEY,
  "patientId" TEXT NOT NULL,
  "caregiverId" TEXT NOT NULL,
  "startTime" TIMESTAMP NOT NULL,
  "endTime" TIMESTAMP,
  "status" TEXT NOT NULL,
  "visitType" TEXT NOT NULL,
  "durationMins" INTEGER,
  "rate" DOUBLE PRECISION
);

CREATE TABLE "AuditLog" (
  "id" TEXT PRIMARY KEY,
  "actor" TEXT NOT NULL,
  "action" TEXT NOT NULL,
  "targetType" TEXT NOT NULL,
  "targetId" TEXT NOT NULL,
  "timestamp" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "metadata" JSONB NOT NULL
);
