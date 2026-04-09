const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
console.log('DNS Servers:', dns.getServers());
dns.resolveSrv('_mongodb._tcp.cluster0.e3eflrx.mongodb.net', (err, addresses) => {
    if (err) {
        console.error('DNS resolveSrv failed:', err.message);
    } else {
        console.log('DNS resolveSrv addresses:', addresses);
    }
});
