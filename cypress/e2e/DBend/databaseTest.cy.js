

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
    const query = `SELECT UNIQUE iu.MOBILE_NUMBER, iu.NAME FROM IPEMIS_PRODUCTION.TEACHER t 
INNER JOIN IPEMIS_PRODUCTION.FUND_ALLOCATION fa ON t.SCHOOL_ID  = fa.SCHOOL_ID
INNER JOIN IPEMIS_PRODUCTION.IEIMS_USER iu ON iu.IEIMS_USER_ID = t.IEIMS_USER_ID 
WHERE fa.ALLOCATION_TYPE = 'SLIP' AND t.POST_ID IN (9,72,73,3128) AND  iu.MOBILE_NUMBER IS NOT NULL`;

    //SELECT UNIQUE iu.IEIMS_USER_ID, iu.NAME_LOCAL, iu.MOBILE_NUMBER FROM IPEMIS_PRODUCTION.OFFICE_POST op 
    // INNER JOIN  IPEMIS_PRODUCTION.OFFICER_JOB_POSTING ojp ON ojp.POSTED_OFFICE_ID = op.OFFICE_ID 
    // INNER JOIN IPEMIS_PRODUCTION.IEIMS_USER iu ON iu.IEIMS_USER_ID = ojp.OFFICER_ID 
    // INNER JOIN IPEMIS_PRODUCTION.SCHOOL s ON s.GEO_CLUSTER_ID = op.GEO_CLUSTER_ID 
    // WHERE op.GEO_CLUSTER_ID IS NOT NULL AND iu.MOBILE_NUMBER IS NOT NULL AND op.GEO_CLUSTER_ID
    // IN 
    // (
    // SELECT UNIQUE s.GEO_CLUSTER_ID FROM IPEMIS_PRODUCTION.TEACHER t 
    // INNER JOIN IPEMIS_PRODUCTION.FUND_ALLOCATION fa ON t.SCHOOL_ID  = fa.SCHOOL_ID
    // INNER JOIN IPEMIS_PRODUCTION.IEIMS_USER iu ON iu.IEIMS_USER_ID = t.IEIMS_USER_ID 
    // INNER JOIN IPEMIS_PRODUCTION.SCHOOL s ON s.SCHOOL_ID = t.SCHOOL_ID 
    // WHERE fa.ALLOCATION_TYPE = 'SLIP' AND t.POST_ID IN (9,72,73,3128) AND  iu.MOBILE_NUMBER IS NOT NULL
    // );
         const array = [];
    cy.task('executeDbStatement', {
      statement: query
    })
      .then((result) => {
        if (result && result.rows && Array.isArray(result.rows)) {
          result.rows.forEach(row => {
             cy.log(JSON.stringify(row));
            console.log(row.MOBILE_NUMBER)
             array.push(row.MOBILE_NUMBER)
            //Cypress.env('userArray').push(row.MOBILE_NUMBER);
            cy.log(array);

          });
        } else {
          cy.log('No rows returned from the query');
        }
        cy.writeFile('cypress/fixtures/db_data.json', result.rows);
      });
  });
});
