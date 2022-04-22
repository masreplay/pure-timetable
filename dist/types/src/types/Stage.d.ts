import type { app__schemas__stage__Branch } from './app__schemas__stage__Branch';
import type { CollageShifts } from './CollageShifts';
export declare type Stage = {
    name?: string;
    shift?: CollageShifts;
    level?: number;
    branch_id?: string;
    id: string;
    branch: app__schemas__stage__Branch;
};
