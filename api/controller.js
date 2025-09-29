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
    'power':    function(a, b) { return Math.pow(a, b) },
  };

  // Unary operations (single operand)
  const unaryOperations = {
    'log': function(a) { return Math.log10(a) },
    'ln':  function(a) { return Math.log(a) },
  };

  if (!req.query.operation) {
    throw new Error("Unspecified operation");
  }

  const operation = operations[req.query.operation];
  const unaryOperation = unaryOperations[req.query.operation];

  if (!operation && !unaryOperation) {
    throw new Error("Invalid operation: " + req.query.operation);
  }

  if (!req.query.operand1 ||
      !req.query.operand1.match(/^(-)?[0-9\.]+(e(-)?[0-9]+)?$/) ||
      req.query.operand1.replace(/[-0-9e]/g, '').length > 1) {
    throw new Error("Invalid operand1: " + req.query.operand1);
  }

  // For unary operations, operand2 is not required
  if (unaryOperation) {
    const operand1 = Number(req.query.operand1);
    
    // Validation for logarithm functions - must be positive
    if ((req.query.operation === 'log' || req.query.operation === 'ln') && operand1 <= 0) {
      throw new Error("Logarithm is undefined for non-positive numbers");
    }
    
    const result = unaryOperation(operand1);
    
    // Check for invalid results (NaN, Infinity)
    if (!isFinite(result)) {
      throw new Error("Result is not a valid number");
    }
    
    res.json({ result: result });
    return;
  }

  // For binary operations, operand2 is required
  if (!req.query.operand2 ||
      !req.query.operand2.match(/^(-)?[0-9\.]+(e(-)?[0-9]+)?$/) ||
      req.query.operand2.replace(/[-0-9e]/g, '').length > 1) {
    throw new Error("Invalid operand2: " + req.query.operand2);
  }

  res.json({ result: operation(req.query.operand1, req.query.operand2) });
};
