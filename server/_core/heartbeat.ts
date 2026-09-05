export type HeartbeatJob = {
  name: string;
  cron: string;
  path: string;
  method?: "POST" | "PUT";
  payload?: unknown;
  description?: string;
};

export type HeartbeatJobUpdate = Partial<Omit<HeartbeatJob, "name">> & {
  enable?: boolean;
};

export type HeartbeatJobInfo = {
  taskUid: string;
  name: string;
  userId: string;
  description: string;
  cronExpression: string;
  callbackPath: string;
  callbackMethod: string;
  callbackPayload: string;
  isEnable: boolean;
  createdAt?: string | null;
  lastExecutedAt?: string | null;
  nextExecutionAt?: string | null;
};

const localJobs = new Map<string, HeartbeatJobInfo>();

export async function createHeartbeatJob(
  job: HeartbeatJob,
  _userSession: string
): Promise<{ taskUid: string; nextExecutionAt?: string | null }> {
  const taskUid = `task_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const info: HeartbeatJobInfo = {
    taskUid,
    name: job.name,
    userId: "local_user",
    description: job.description || "",
    cronExpression: job.cron,
    callbackPath: job.path,
    callbackMethod: job.method || "POST",
    callbackPayload: JSON.stringify(job.payload || {}),
    isEnable: true,
    createdAt: new Date().toISOString(),
    nextExecutionAt: new Date(Date.now() + 60000).toISOString(),
  };
  localJobs.set(taskUid, info);
  return { taskUid, nextExecutionAt: info.nextExecutionAt };
}

export async function updateHeartbeatJob(
  taskUid: string,
  patch: HeartbeatJobUpdate,
  _userSession: string
): Promise<{ nextExecutionAt?: string | null }> {
  const job = localJobs.get(taskUid);
  if (job) {
    if (patch.cron) job.cronExpression = patch.cron;
    if (patch.path) job.callbackPath = patch.path;
    if (patch.enable !== undefined) job.isEnable = patch.enable;
    if (patch.description) job.description = patch.description;
  }
  return { nextExecutionAt: job?.nextExecutionAt || null };
}

export async function deleteHeartbeatJob(
  taskUid: string,
  _userSession: string
): Promise<void> {
  localJobs.delete(taskUid);
}

export async function listHeartbeatJobs(
  _userSession: string,
  _pagination?: { page?: number; pageSize?: number }
): Promise<{ total: number; actorUserId: string; jobs: HeartbeatJobInfo[] }> {
  const jobs = Array.from(localJobs.values());
  return {
    total: jobs.length,
    actorUserId: "local_user",
    jobs,
  };
}
