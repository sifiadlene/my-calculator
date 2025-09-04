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
    'log':      function(a) { 
      if (Number(a) <= 0) throw new Error('Cannot calculate logarithm of non-positive number');
      return Math.log(Number(a)); 
    },
    'log10':    function(a) { 
      if (Number(a) <= 0) throw new Error('Cannot calculate logarithm of non-positive number');
      return Math.log10(Number(a)); 
    },
    'sqrt':     function(a) { 
      if (Number(a) < 0) throw new Error('Cannot calculate square root of negative number');
      return Math.sqrt(Number(a)); 
    },
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

  const singleOperandOps = ['log', 'log10', 'sqrt'];
  const isSingleOperandOp = singleOperandOps.includes(req.query.operation);

  if (!isSingleOperandOp) {
    if (!req.query.operand2 ||
        !req.query.operand2.match(/^(-)?[0-9\.]+(e(-)?[0-9]+)?$/) ||
        req.query.operand2.replace(/[-0-9e]/g, '').length > 1) {
      throw new Error("Invalid operand2: " + req.query.operand2);
    }
    res.json({ result: operation(req.query.operand1, req.query.operand2) });
  } else {
    res.json({ result: operation(req.query.operand1) });
  }
};
