describe('Arithmetic', function () {
    describe('Validation', function () {
        it('rejects missing operation', function (done) {
            request.get('/arithmetic?operand1=21&operand2=21')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.eql({ error: "Unspecified operation" });
                    done();
                });
        });
        it('rejects invalid operation', function (done) {
            request.get('/arithmetic?operation=foobar&operand1=21&operand2=21')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.eql({ error: "Invalid operation: foobar" });
                    done();
                });
        });
        it('rejects missing operand1', function (done) {
            request.get('/arithmetic?operation=add&operand2=21')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.eql({ error: "Invalid operand1: undefined" });
                    done();
                });
        });
        it('rejects operands with invalid sign', function (done) {
            request.get('/arithmetic?operation=add&operand1=4.2-1&operand2=4')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.eql({ error: "Invalid operand1: 4.2-1" });
                    done();
                });
        });
        it('rejects operands with invalid decimals', function (done) {
            request.get('/arithmetic?operation=add&operand1=4.2.1&operand2=4')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.eql({ error: "Invalid operand1: 4.2.1" });
                    done();
                });
        });
    });

    describe('Addition', function () {
        it('adds two positive integers', function (done) {
            request.get('/arithmetic?operation=add&operand1=21&operand2=21')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 42 });
                    done();
                });
        });
        it('adds zero to an integer', function (done) {
            request.get('/arithmetic?operation=add&operand1=42&operand2=0')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 42 });
                    done();
                });
        });
        it('adds a negative integer to a positive integer', function (done) {
            request.get('/arithmetic?operation=add&operand1=21&operand2=-42')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: -21 });
                    done();
                });
        });
        it('adds two negative integers', function (done) {
            request.get('/arithmetic?operation=add&operand1=-21&operand2=-21')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: -42 });
                    done();
                });
        });
        it('adds an integer to a floating point number', function (done) {
            request.get('/arithmetic?operation=add&operand1=2.5&operand2=-5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: -2.5 });
                    done();
                });
        });
        it('adds with negative exponent', function (done) {
            request.get('/arithmetic?operation=add&operand1=1.2e-5&operand2=-1.2e-5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 0 });
                    done();
                });
        });
    });

    describe('Subtraction', function () {
        it('subtracts two positive integers', function (done) {
            request.get('/arithmetic?operation=subtract&operand1=21&operand2=21')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 0 });
                    done();
                });
        });
        it('subtracts zero from an integer', function (done) {
            request.get('/arithmetic?operation=subtract&operand1=42&operand2=0')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 42 });
                    done();
                });
        });
        it('subtracts an integer from zero', function (done) {
            request.get('/arithmetic?operation=subtract&operand1=0&operand2=42')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: -42 });
                    done();
                });
        });
        it('subtracts a negative integer from a positive integer', function (done) {
            request.get('/arithmetic?operation=subtract&operand1=21&operand2=-42')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 63 });
                    done();
                });
        });
        it('subtracts a positive integer from a negative integer', function (done) {
            request.get('/arithmetic?operation=subtract&operand1=-21&operand2=42')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: -63 });
                    done();
                });
        });
        it('subtracts two negative integers', function (done) {
            request.get('/arithmetic?operation=subtract&operand1=-21&operand2=-21')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 0 });
                    done();
                });
        });
        it('subtracts floating point numbers', function (done) {
            request.get('/arithmetic?operation=subtract&operand1=2.5&operand2=0.5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 2 });
                    done();
                });
        });
        it('subtracts with negative exponent', function (done) {
            request.get('/arithmetic?operation=subtract&operand1=1.2e-5&operand2=-1.2e-5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 2.4e-5 });
                    done();
                });
        });
        it('subtracts numbers resulting in negative zero', function (done) {
            request.get('/arithmetic?operation=subtract&operand1=0&operand2=0')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 0 });
                    done();
                });
        });
        it('subtracts very large numbers', function (done) {
            request.get('/arithmetic?operation=subtract&operand1=1e20&operand2=1')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 1e20 - 1 });
                    done();
                });
        });
        it('subtracts very small numbers', function (done) {
            request.get('/arithmetic?operation=subtract&operand1=1e-20&operand2=1e-21')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 9e-21 });
                    done();
                });
        });
    });

    describe('Multiplication', function () {
        it('multiplies two positive integers', function (done) {
            request.get('/arithmetic?operation=multiply&operand1=21&operand2=2')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 42 });
                    done();
                });
        });
        it('multiplies a positive integer with zero', function (done) {
            request.get('/arithmetic?operation=multiply&operand1=21&operand2=0')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 0 });
                    done();
                });
        });
        it('multiplies a positive integer and negative integer', function (done) {
            request.get('/arithmetic?operation=multiply&operand1=21&operand2=-2')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: -42 });
                    done();
                });
        });
        it('multiplies two negative integers', function (done) {
            request.get('/arithmetic?operation=multiply&operand1=-21&operand2=-2')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 42 });
                    done();
                });
        });
        it('multiplies two floating point numbers', function (done) {
            request.get('/arithmetic?operation=multiply&operand1=.5&operand2=0.5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 0.25 });
                    done();
                });
        });
        it('multiplies supporting exponential notation', function (done) {
            request.get('/arithmetic?operation=multiply&operand1=4.2e1&operand2=1e0')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 42 });
                    done();
                });
        });
    });

    describe('Division', function () {
        it('divides a positive integer by an integer factor ', function (done) {
            request.get('/arithmetic?operation=divide&operand1=42&operand2=2')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 21 });
                    done();
                });
        });
        it('divides a negative integer by an integer factor ', function (done) {
            request.get('/arithmetic?operation=divide&operand1=-42&operand2=2')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: -21 });
                    done();
                });
        });
        it('divides a positive integer by a non-factor', function (done) {
            request.get('/arithmetic?operation=divide&operand1=21&operand2=42')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 0.5 });
                    done();
                });
        });
        it('divides a positive integer by a negative integer', function (done) {
            request.get('/arithmetic?operation=divide&operand1=21&operand2=-42')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: -0.5 });
                    done();
                });
        });
        it('divides zero by a positive integer', function (done) {
            request.get('/arithmetic?operation=divide&operand1=0&operand2=42')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 0 });
                    done();
                });
        });
        it('divides by zero', function (done) {
            request.get('/arithmetic?operation=divide&operand1=0.5&operand2=2')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 0.25 });
                    done();
                });
        });
        it('divides by zero', function (done) {
            request.get('/arithmetic?operation=divide&operand1=21&operand2=0')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: null });
                    done();
                });
        });
    });

    describe('Square Root', function () {
        it('calculates square root of a positive integer', function (done) {
            request.get('/arithmetic?operation=sqrt&operand1=9')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 3 });
                    done();
                });
        });
        it('calculates square root of zero', function (done) {
            request.get('/arithmetic?operation=sqrt&operand1=0')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 0 });
                    done();
                });
        });
        it('calculates square root of a floating point number', function (done) {
            request.get('/arithmetic?operation=sqrt&operand1=2.25')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 1.5 });
                    done();
                });
        });
        it('calculates square root of a negative number', function (done) {
            request.get('/arithmetic?operation=sqrt&operand1=-4')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: null });
                    done();
                });
        });
        it('rejects sqrt operation when operand2 is provided', function (done) {
            request.get('/arithmetic?operation=sqrt&operand1=9&operand2=4')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 3 });
                    done();
                });
        });
    });
});
