
import * as dotenv from 'dotenv';
import { bgBlue, yellow } from 'colors'
import { DateTime } from 'luxon';

dotenv.config({});
const can = process.env.LOGS;

export const devLog = (data: any, title?: string, hiddenDate: boolean = false) => {
    if (!can) return;
    let now = DateTime.now().toFormat('MM-dd HH:mm');
    title = `[${title || 'LOG'}]`;
    now = hiddenDate == false && `(${now})`
    console.log(`${bgBlue(title)}${yellow(now) || ''}`, data);
};
