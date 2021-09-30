let Redis = require('ioredis');

//redis配置
let redis_config = {
	port: 6379,
	host: 'localhost',
	family: 4, // 4 (IPv4) or 6 (IPv6)
	password: '',
	db: 1 //使用数据库序号
}


const redisObj = {
	client: null,
	connect: function () {
		const client = new Redis(redis_config)
		client.on('ready', function (res) {
			console.log('2.Redis 数据库连接成功!');
		});

		client.on('error', function (err) {
			console.log(err);
		});
		this.client = client;
		return this.client;
	}
}

module.exports = redisObj.connect();
