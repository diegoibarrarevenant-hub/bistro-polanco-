"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface BiomarkerEntry {
  userId: string;
  hrv?: number;
  restingHR?: number;
  sleepScore?: number;
  deepSleepMins?: number;
  vo2Max?: number;
  energyLevel?: number;
  weight?: number;
  nadLevel?: number;
  source?: "MANUAL" | "OURA" | "WHOOP" | "APPLE_HEALTH" | "GARMIN" | "BLOODWORK";
  notes?: string;
}

export async function logBiomarkers(entry: BiomarkerEntry) {
  const log = await prisma.biomarkerLog.create({
    data: {
      userId: entry.userId,
      hrv: entry.hrv,
      restingHR: entry.restingHR,
      sleepScore: entry.sleepScore,
      deepSleepMins: entry.deepSleepMins,
      vo2Max: entry.vo2Max,
      energyLevel: entry.energyLevel,
      weight: entry.weight,
      nadLevel: entry.nadLevel,
      source: entry.source ?? "MANUAL",
      notes: entry.notes,
    },
  });

  revalidatePath("/biomarkers");
  return log;
}

export async function getUserBiomarkerHistory(userId: string, days = 90) {
  const since = new Date();
  since.setDate(since.getDate() - days);

  return prisma.biomarkerLog.findMany({
    where: { userId, loggedAt: { gte: since } },
    orderBy: { loggedAt: "asc" },
  });
}
