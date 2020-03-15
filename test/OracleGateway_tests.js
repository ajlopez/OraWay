
const OracleGateway = artifacts.require('OracleGateway.sol');

const expectThrow = require('./utils').expectThrow;

contract('OracleGateway', function (accounts) {
    const root = accounts[0];
    const alice = accounts[1];
    
    const topic1 = web3.utils.sha3('foo');
    
    beforeEach(async function () {
        this.gateway = await OracleGateway.new();
    });
    
    it('root is owner', async function () {
        const owner = await this.gateway.owner();
        
        assert.equal(owner, root);
    });
    
    it('no topic', async function () {
        const result = await this.gateway.topics(topic1);
        
        assert.equal(result, false);
    });
    
    it('define topic', async function () {
        await this.gateway.addTopic(topic1);
        
        const result = await this.gateway.topics(topic1);
        
        assert.equal(result, true);
    });
    
    it('only owner can define topic', async function () {
        expectThrow(this.gateway.addTopic(topic1, { from: alice }));
        
        const result = await this.gateway.topics(topic1);
        
        assert.equal(result, false);
    });
});

