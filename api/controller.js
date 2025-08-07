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
  var operations = {
    'add':      function(a, b) { return Number(a) + Number(b) },
    'subtract': function(a, b) { return a - b },
    'multiply': function(a, b) { return a * b },
    'divide':   function(a, b) { return a / b },
    'sqrt':     function(a) { return Math.sqrt(a) },
  };

  if (!req.query.operation) {
    throw new Error("Unspecified operation");
  }

  var operation = operations[req.query.operation];

  if (!operation) {
    throw new Error("Invalid operation: " + req.query.operation);
  }

  if (!req.query.operand1 ||
      !req.query.operand1.match(/^(-)?[0-9\.]+(e(-)?[0-9]+)?$/) ||
      req.query.operand1.replace(/[-0-9e]/g, '').length > 1) {
    throw new Error("Invalid operand1: " + req.query.operand1);
  }

  // Validate operand2 for operations that need it
  if (req.query.operation !== 'sqrt') {
    if (!req.query.operand2 ||
        !req.query.operand2.match(/^(-)?[0-9\.]+(e(-)?[0-9]+)?$/) ||
        req.query.operand2.replace(/[-0-9e]/g, '').length > 1) {
      throw new Error("Invalid operand2: " + req.query.operand2);
    }
  }

  // Special validation for sqrt - check for negative numbers
  if (req.query.operation === 'sqrt' && Number(req.query.operand1) < 0) {
    throw new Error("Square root of negative number is not allowed");
  }

  // Call operation with appropriate parameters
  if (req.query.operation === 'sqrt') {
    res.json({ result: operation(req.query.operand1) });
  } else {
    res.json({ result: operation(req.query.operand1, req.query.operand2) });
  }
};
