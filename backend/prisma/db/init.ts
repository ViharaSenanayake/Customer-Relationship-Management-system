import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from './client';


export async function initDb(): Promise<void> {
  await prisma.$connect();

  const demoPasswordHash = bcrypt.hashSync('password123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    create: {
      id: '1',
      name: 'Admin User',
      email: 'admin@example.com',
      passwordHash: demoPasswordHash,
    },
    update: {
      name: 'Admin User',
      passwordHash: demoPasswordHash,
    },
  });

  const leadCount = await prisma.lead.count();
  if (leadCount !== 0) return;

  const now = new Date();
  const sample = [
    {
      name: 'Alice Johnson',
      email: 'alice@techcorp.com',
      phone: '+1-555-0101',
      company: 'TechCorp',
      source: 'Website',
      status: 'New',
      dealValue: 12000,
      assignedTo: 'Admin User',
    },
    {
      name: 'Bob Martinez',
      email: 'bob@startup.io',
      phone: '+1-555-0102',
      company: 'Startup IO',
      source: 'LinkedIn',
      status: 'Contacted',
      dealValue: 8500,
      assignedTo: 'Admin User',
    },
    {
      name: 'Carol White',
      email: 'carol@enterprise.com',
      phone: '+1-555-0103',
      company: 'Enterprise Inc',
      source: 'Referral',
      status: 'Qualified',
      dealValue: 45000,
      assignedTo: 'Admin User',
    },
    {
      name: 'David Lee',
      email: 'david@globaltech.com',
      phone: '+1-555-0104',
      company: 'GlobalTech',
      source: 'Cold Email',
      status: 'Proposal Sent',
      dealValue: 22000,
      assignedTo: 'Admin User',
    },
    {
      name: 'Eva Chen',
      email: 'eva@bigdeal.com',
      phone: '+1-555-0105',
      company: 'BigDeal Co',
      source: 'Event',
      status: 'Won',
      dealValue: 60000,
      assignedTo: 'Admin User',
    },
  ];

  await prisma.lead.createMany({
    data: sample.map((l) => ({
      id: uuidv4(),
      name: l.name,
      company: l.company,
      email: l.email,
      phone: l.phone,
      source: l.source,
      status: l.status,
      assignedTo: l.assignedTo,
      dealValue: l.dealValue,
      createdAt: now,
      updatedAt: now,
    })),
  });
}
