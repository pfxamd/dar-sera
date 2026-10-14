import {rm} from 'node:fs/promises';
// Prevent stale routes and superseded generated images from entering a deployment.
await rm(new URL('../dist/',import.meta.url),{recursive:true,force:true});
