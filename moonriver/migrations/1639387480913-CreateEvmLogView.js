class CreateEvmLogView1639387480913 {
    constructor() {
        this.name = 'CreateEvmLogView1639387480913';
    }

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE VIEW evm_log AS
            SELECT
                block_number,
                block_hash,
                jsonb_array_elements(substrate_event.params)-> 'value' AS value
            FROM
                substrate_event
            WHERE
                name = 'evm.Log'
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP VIEW evm_log`);
    }
}

exports.CreateEvmLogView1639387480913 = CreateEvmLogView1639387480913;
