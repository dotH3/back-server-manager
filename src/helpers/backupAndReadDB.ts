import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { DateTime } from 'luxon';
import { join } from 'path';
import { devLog } from './devLog';
import { mkdirSync, existsSync } from 'fs';

interface BackupOptions {
    host: string;
    user: string;
    password: string;
    database: string;
    outputPath: string;
}

export async function backupAndReadDB({
    host,
    user,
    password,
    database,
    outputPath,
}: BackupOptions): Promise<string> {
    if (!existsSync(outputPath)) {
        mkdirSync(outputPath, { recursive: true });
    }

    const now = DateTime.now().toFormat('yyyy-LL-dd_HH-mm-ss');
    const backupFile = join(outputPath, `${database}_${now}.sql`);

    const mysqldumpCommand = `mysqldump -h ${host} -u ${user} -p${password} ${database} > ${backupFile}`;
    execSync(mysqldumpCommand);

    const data = readFileSync(backupFile, 'utf8');
    devLog(`Backup created ${user}@${database}`, 'DB');

    return data;
}
