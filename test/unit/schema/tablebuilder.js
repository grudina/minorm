/** @flow */
import {createTableBuilder} from '../../../src/schema/tablebuilder'
import {assert} from 'chai'

describe('Unit', () => {
  describe('Schema', () => {
    describe('Table Builder', () => {
      it('should create sql for columns', () => {
        const usersBlock = `CREATE TABLE IF NOT EXISTS \`users\` (
\`id\` INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
\`login\` VARCHAR(255) NOT NULL,
\`password\` VARCHAR(255) NOT NULL,
\`createdAt\` DATE

) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;`
        const builder = createTableBuilder('users', gateway => {
          gateway.column('id').int().unsigned().primary().autoIncrement()
          gateway.column('login').notNull()
          gateway.column('password').notNull()
          gateway.column('createdAt').date()
        })
        // $FlowIgnore inner method usage
        assert.equal(builder.build(), usersBlock)
      })
    })
  })
})