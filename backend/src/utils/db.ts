import { PrismaClient } from '@prisma/client';
import { LibSQLAdapter } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';

const libsql = createClient({
  url: 'file:./prisma/dev.db'
});

const adapter = new LibSQLAdapter(libsql);
const prisma = new PrismaClient({ adapter });

export default prisma;
