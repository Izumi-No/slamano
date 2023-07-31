import { HyperExpressServer } from '@/server/hyper-express/hyperExpressServer.js';

await new HyperExpressServer().start(3030);
