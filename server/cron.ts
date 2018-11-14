import * as ms from 'ms';
import * as signale from 'signale';
import * as entryQuery from './db/entryQuery';
import * as botController from './controllers/botController';
import { wait } from '../client/utils';
import config from './config';

// Update channels and uspergroups members each 12 hours
setInterval(async () => {
  try {
    const entries = await entryQuery.getNonBots();
    for (const entry of entries) {
      try {
        await wait(2000);
        const members = await botController.getChatMembers(entry.username);
        await entryQuery.update(entry.username, { members }, true);
      } catch (error) {
        if (config.is_dev) signale.fatal(error);
      }
    }
  } catch (error) {
    if (config.is_dev) signale.fatal(error);
  }
}, ms('12 hours'));
