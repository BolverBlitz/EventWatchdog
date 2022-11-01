const Watchdog = require('../index');
const chai = require('chai');
const expect = chai.expect;

describe('Watchdog', function () {
    this.timeout(15000);

    it('should create a new instance', () => {
        const watchdog = new Watchdog(1, 1, true);
        expect(watchdog).to.be.an.instanceOf(Watchdog);
    });

    it('Wait for timeout', (done) => {
        const watchdog = new Watchdog(1, 1, false);
        watchdog.addMonitor('test');
        watchdog.on('timeout', (data) => {
            expect(data).to.be.an('object');
            expect(data).to.have.property('monitor');
            expect(data).to.have.property('offline_since');
            expect(data.monitor).to.be.a('string');
            expect(data.monitor).to.be.equal('test');
            expect(data.offline_since).to.be.a('number');
            done();
        });

    });

});