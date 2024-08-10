

// spec.cy.js
describe('Connect to node-oracledb spec', () => {
  it('Execute a simple query', () => {
    // First query to check the user
    cy.task('executeDbStatement', {
      statement: 'select user from dual'
    })
      .then((response) => {
        expect(response['rows'][0]['USER'].toLowerCase()).to.equal(Cypress.env('DB_USER').toLowerCase());
        cy.log(response['rows'][0]['USER']);
      });

    // Query to fetch data from IPEMIS_PRODUCTION.SLIP
    const query = `SELECT iu.MOBILE_NUMBER
    FROM IPEMIS_PRODUCTION.SLIP_BASIC_INFORMATION sbi 
    JOIN IPEMIS_PRODUCTION.TEACHER t ON t.TEACHER_ID = sbi.SLIP_TEAM_HEAD_TEACHER_ID 
    JOIN IPEMIS_PRODUCTION.IEIMS_USER iu ON iu.IEIMS_USER_ID = t.IEIMS_USER_ID WHERE SLIP_ID = 186`;
    const array = [];
    cy.task('executeDbStatement', {
      statement: query
    })
      .then((result) => {
        if (result && result.rows && Array.isArray(result.rows)) {
          result.rows.forEach(row => {
            // Convert the row object to a string and log it
           // cy.log(JSON.stringify(row));
            cy.log(row.MOBILE_NUMBER)
            array.push(row.MOBILE_NUMBER)
            //Cypress.env('userArray').push(row.MOBILE_NUMBER);
            
          });
        } else {
          cy.log('No rows returned from the query');
        }
        cy.writeFile('cypress/fixtures/db_data.json', result.rows);
      });
  });
});
