describe('Advanced Mathematical Operations', function () {
    describe('Logarithmic Functions', function () {
        describe('Natural Logarithm (ln)', function () {
            it('calculates ln(1) correctly', function (done) {
                request.get('/arithmetic?operation=log&operand1=1')
                    .expect(200)
                    .end(function (err, res) {
                        expect(res.body).to.eql({ result: 0 });
                        done();
                    });
            });
            
            it('calculates ln(e) correctly', function (done) {
                request.get('/arithmetic?operation=log&operand1=2.718281828459045')
                    .expect(200)
                    .end(function (err, res) {
                        expect(res.body.result).to.be.closeTo(1, 0.000001);
                        done();
                    });
            });
            
            it('calculates ln(10) correctly', function (done) {
                request.get('/arithmetic?operation=log&operand1=10')
                    .expect(200)
                    .end(function (err, res) {
                        expect(res.body.result).to.be.closeTo(2.302585092994046, 0.000001);
                        done();
                    });
            });
            
            it('rejects ln(0)', function (done) {
                request.get('/arithmetic?operation=log&operand1=0')
                    .expect(400)
                    .end(function (err, res) {
                        expect(res.body).to.eql({ error: 'Cannot calculate logarithm of non-positive number' });
                        done();
                    });
            });
            
            it('rejects ln(-1)', function (done) {
                request.get('/arithmetic?operation=log&operand1=-1')
                    .expect(400)
                    .end(function (err, res) {
                        expect(res.body).to.eql({ error: 'Cannot calculate logarithm of non-positive number' });
                        done();
                    });
            });
        });
        
        describe('Base-10 Logarithm (log10)', function () {
            it('calculates log10(1) correctly', function (done) {
                request.get('/arithmetic?operation=log10&operand1=1')
                    .expect(200)
                    .end(function (err, res) {
                        expect(res.body).to.eql({ result: 0 });
                        done();
                    });
            });
            
            it('calculates log10(10) correctly', function (done) {
                request.get('/arithmetic?operation=log10&operand1=10')
                    .expect(200)
                    .end(function (err, res) {
                        expect(res.body).to.eql({ result: 1 });
                        done();
                    });
            });
            
            it('calculates log10(100) correctly', function (done) {
                request.get('/arithmetic?operation=log10&operand1=100')
                    .expect(200)
                    .end(function (err, res) {
                        expect(res.body).to.eql({ result: 2 });
                        done();
                    });
            });
            
            it('calculates log10(0.1) correctly', function (done) {
                request.get('/arithmetic?operation=log10&operand1=0.1')
                    .expect(200)
                    .end(function (err, res) {
                        expect(res.body).to.eql({ result: -1 });
                        done();
                    });
            });
            
            it('rejects log10(0)', function (done) {
                request.get('/arithmetic?operation=log10&operand1=0')
                    .expect(400)
                    .end(function (err, res) {
                        expect(res.body).to.eql({ error: 'Cannot calculate logarithm of non-positive number' });
                        done();
                    });
            });
            
            it('rejects log10(-10)', function (done) {
                request.get('/arithmetic?operation=log10&operand1=-10')
                    .expect(400)
                    .end(function (err, res) {
                        expect(res.body).to.eql({ error: 'Cannot calculate logarithm of non-positive number' });
                        done();
                    });
            });
        });
    });
    
    describe('Square Root Function', function () {
        it('calculates sqrt(0) correctly', function (done) {
            request.get('/arithmetic?operation=sqrt&operand1=0')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 0 });
                    done();
                });
        });
        
        it('calculates sqrt(1) correctly', function (done) {
            request.get('/arithmetic?operation=sqrt&operand1=1')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 1 });
                    done();
                });
        });
        
        it('calculates sqrt(4) correctly', function (done) {
            request.get('/arithmetic?operation=sqrt&operand1=4')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 2 });
                    done();
                });
        });
        
        it('calculates sqrt(9) correctly', function (done) {
            request.get('/arithmetic?operation=sqrt&operand1=9')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 3 });
                    done();
                });
        });
        
        it('calculates sqrt(2) correctly', function (done) {
            request.get('/arithmetic?operation=sqrt&operand1=2')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.be.closeTo(1.4142135623730951, 0.000001);
                    done();
                });
        });
        
        it('calculates sqrt(0.25) correctly', function (done) {
            request.get('/arithmetic?operation=sqrt&operand1=0.25')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 0.5 });
                    done();
                });
        });
        
        it('rejects sqrt(-1)', function (done) {
            request.get('/arithmetic?operation=sqrt&operand1=-1')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.eql({ error: 'Cannot calculate square root of negative number' });
                    done();
                });
        });
        
        it('rejects sqrt(-4)', function (done) {
            request.get('/arithmetic?operation=sqrt&operand1=-4')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.eql({ error: 'Cannot calculate square root of negative number' });
                    done();
                });
        });
    });
    
    describe('Single Operand Validation', function () {
        it('accepts valid single operand for log', function (done) {
            request.get('/arithmetic?operation=log&operand1=5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.be.a('number');
                    done();
                });
        });
        
        it('accepts valid single operand for sqrt', function (done) {
            request.get('/arithmetic?operation=sqrt&operand1=16')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 4 });
                    done();
                });
        });
        
        it('rejects missing operand1 for single operand operations', function (done) {
            request.get('/arithmetic?operation=sqrt')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.eql({ error: 'Invalid operand1: undefined' });
                    done();
                });
        });
        
        it('handles scientific notation for single operand operations', function (done) {
            request.get('/arithmetic?operation=sqrt&operand1=1e2')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 10 });
                    done();
                });
        });
    });
});