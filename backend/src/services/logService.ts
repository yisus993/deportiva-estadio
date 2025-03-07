import { Log } from '../models/log';

export const LogService = {
  createLog: async (user: string, action: string, details: string): Promise<Log> => {
    return await Log.create({ user, action, details, timestamp: new Date() });
  },

  getAllLogs: async (): Promise<Log[]> => {
    return await Log.findAll();
  }
};
