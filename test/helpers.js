const supertest = require('supertest');
const app = require('../server');

global.app = app;
global.request = supertest(app);

// Dynamically import chai since it's an ES module
(async () => {
  const chai = await import('chai');
  global.expect = chai.expect;
})();
