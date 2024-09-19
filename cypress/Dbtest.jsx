// dbPlugin.js

let connection;
const DbPluginUtil = {
    async setupDb(config) {
        // has to be in this method or even importing this file will break stuff in cypress
        const oracledb = require('oracledb');
        oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
        oracledb.autoCommit = true;
        console.log('oracledb version:',oracledb.versionString);
        // oracledb.initOracleClient({configDir: config['TNS_ADMIN_LOCATION']});

        // Use the default Thin mode of node-oracledb
        connection = await oracledb.getConnection({
            user: config.env['DB_USER'],
            password: config.env['DB_PASSWORD'],
            connectString: config.env['DB_CONNECTSTRING'],
        });
        return null;
    },
    async testConnection(config) {
        if (!connection) {
            await this.setupDb(config);
        }
    },
    async executeDbStatement(statement, config) {
        await this.testConnection(config);
        try {
            return await connection.execute(statement);
        } catch (e) {
            throw new Error('failed to execute: ' + statement + '\n' + e.message);
        }
    },
}

// Make the DbPluginUtil object singleton and immutable
Object.freeze(DbPluginUtil);

function loadDBPlugin(config) {
    return {
        async executeDbStatement({statement}) {
            return await DbPluginUtil.executeDbStatement(statement, config);
        },
    }
}
module.exports = {
    loadDBPlugin
}