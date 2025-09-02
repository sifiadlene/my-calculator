'use strict';

exports.calculate = function(req, res) {
  req.app.use(function(err, _req, res, next) {
    if (res.headersSent) {
      return next(err);
    }

    res.status(400);
    res.json({ error: err.message });
  });

  // TODO: Add operator
  const operations = {
    'add':      function(a, b) { return Number(a) + Number(b) },
    'subtract': function(a, b) { return a - b },
    'multiply': function(a, b) { return a * b },
    'divide':   function(a, b) { return a / b },
    'sqrt':     function(a) { return Math.sqrt(a) },
  };

  if (!req.query.operation) {
    throw new Error("Unspecified operation");
  }

  const operation = operations[req.query.operation];

  if (!operation) {
    throw new Error("Invalid operation: " + req.query.operation);
  }

  if (!req.query.operand1 ||
      !req.query.operand1.match(/^(-)?[0-9\.]+(e(-)?[0-9]+)?$/) ||
      req.query.operand1.replace(/[-0-9e]/g, '').length > 1) {
    throw new Error("Invalid operand1: " + req.query.operand1);
  }

  // operand2 is only required for binary operations
  var isUnaryOperation = req.query.operation === 'sqrt';
  
  if (!isUnaryOperation) {
    if (!req.query.operand2 ||
        !req.query.operand2.match(/^(-)?[0-9\.]+(e(-)?[0-9]+)?$/) ||
        req.query.operand2.replace(/[-0-9e]/g, '').length > 1) {
      throw new Error("Invalid operand2: " + req.query.operand2);
    }
  }

  res.json({ result: isUnaryOperation ? operation(req.query.operand1) : operation(req.query.operand1, req.query.operand2) });
};
