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
    'sqrt':     function(a) { 
      var num = Number(a);
      if (num < 0) {
        throw new Error("Impossible de calculer la racine carrée d'un nombre négatif");
      }
      return Math.sqrt(num); 
    },
    'log10':    function(a) { 
      var num = Number(a);
      if (num <= 0) {
        throw new Error("Impossible de calculer le logarithme d'un nombre inférieur ou égal à zéro");
      }
      return Math.log10(num); 
    },
  };

  if (!req.query.operation) {
    throw new Error("Unspecified operation");
  }

  var operation = operations[req.query.operation];

  if (!operation) {
    throw new Error("Invalid operation: " + req.query.operation);
  }

  if (!req.query.operand1 ||
      !req.query.operand1.match(/^(-)?[0-9.]+(e(-)?[0-9]+)?$/) ||
      req.query.operand1.replace(/[-0-9e]/g, '').length > 1) {
    throw new Error("Invalid operand1: " + req.query.operand1);
  }

  // Check if this is a unary operation (sqrt, log10)
  var unaryOperations = ['sqrt', 'log10'];
  var isUnaryOperation = unaryOperations.includes(req.query.operation);

  if (!isUnaryOperation) {
    if (!req.query.operand2 ||
        !req.query.operand2.match(/^(-)?[0-9.]+(e(-)?[0-9]+)?$/) ||
        req.query.operand2.replace(/[-0-9e]/g, '').length > 1) {
      throw new Error("Invalid operand2: " + req.query.operand2);
    }
  }

  if (isUnaryOperation) {
    res.json({ result: operation(req.query.operand1) });
  } else {
    res.json({ result: operation(req.query.operand1, req.query.operand2) });
  }
};
