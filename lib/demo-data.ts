export type ClientRecord = {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  service: string | null;
  status: string;
  notes: string | null;
  created_at: string;
};

export type ProjectRecord = {
  id: number;
  name: string;
  client_id: number | null;
  client?: string | null;
  service: string;
  deadline: string;
  budget: number;
  priority: "High" | "Medium" | "Low";
  status: "Pending" | "In Progress" | "Completed";
  created_at: string;
};

export type TaskRecord = {
  id: number;
  title: string;
  description: string | null;
  category: string;
  status: "Pending" | "In Progress" | "Completed";
  priority: "High" | "Medium" | "Low";
  due_date: string | null;
  project_id: number | null;
  project_name?: string | null;
  created_at: string;
};

export type ContactMessageRecord = {
  id: number;
  name: string;
  email: string;
  company: string | null;
  service: string | null;
  message: string;
  created_at: string;
};

export const demoClients: ClientRecord[] = [
  {
    id: 1,
    name: "Ava Thompson",
    email: "ava@northstar.co.za",
    phone: "+27 82 555 0146",
    company: "Northstar Studio",
    service: "Branding & Design",
    status: "Active",
    notes: "Launching a brand refresh in Q4.",
    created_at: "2025-01-18T09:00:00.000Z",
  },
  {
    id: 2,
    name: "Mpho Ndlovu",
    email: "mpho@peaklaunch.io",
    phone: "+27 71 452 8851",
    company: "PeakLaunch",
    service: "Web Development",
    status: "Active",
    notes: "Need a new lead-generation website.",
    created_at: "2025-02-12T11:30:00.000Z",
  },
];

export const demoProjects: ProjectRecord[] = [
  {
    id: 1,
    name: "Northstar Brand Refresh",
    client_id: 1,
    client: "Northstar Studio",
    service: "Branding & Design",
    deadline: "2025-12-15",
    budget: 8500,
    priority: "High",
    status: "In Progress",
    created_at: "2025-03-10T14:00:00.000Z",
  },
  {
    id: 2,
    name: "PeakLaunch Website",
    client_id: 2,
    client: "PeakLaunch",
    service: "Web Development",
    deadline: "2025-11-30",
    budget: 12500,
    priority: "Medium",
    status: "Pending",
    created_at: "2025-04-01T09:45:00.000Z",
  },
];

export const demoTasks: TaskRecord[] = [
  {
    id: 1,
    title: "Finalize homepage wireframe",
    description: "Prepare the homepage structure and conversion flow.",
    category: "Web Development",
    status: "In Progress",
    priority: "High",
    due_date: "2025-11-02",
    project_id: 2,
    project_name: "PeakLaunch Website",
    created_at: "2025-10-16T08:00:00.000Z",
  },
  {
    id: 2,
    title: "Review brand guideline deck",
    description: "Approve the revised logo and palette recommendations.",
    category: "Branding & Design",
    status: "Pending",
    priority: "Medium",
    due_date: "2025-11-08",
    project_id: 1,
    project_name: "Northstar Brand Refresh",
    created_at: "2025-10-18T08:00:00.000Z",
  },
];

export const demoContactMessages: ContactMessageRecord[] = [];

let clientSequence = demoClients.length + 1;
let projectSequence = demoProjects.length + 1;
let taskSequence = demoTasks.length + 1;
let contactSequence = demoContactMessages.length + 1;

export function nextClientId() {
  const current = clientSequence;
  clientSequence += 1;
  return current;
}

export function nextProjectId() {
  const current = projectSequence;
  projectSequence += 1;
  return current;
}

export function nextTaskId() {
  const current = taskSequence;
  taskSequence += 1;
  return current;
}

export function nextContactMessageId() {
  const current = contactSequence;
  contactSequence += 1;
  return current;
}
