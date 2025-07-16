import supertest from 'supertest';
import { expect } from 'chai';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const app = require('../server.js');

global.app = app;
global.expect = expect;
global.request = supertest(app);
