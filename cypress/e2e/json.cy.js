describe('Using the User Array from Cypress Env', () => {
  const users = [];

  before(() => {
    cy.readFile('cypress/fixtures/db_data.json').then((data) => {
      data.forEach(item => {
        // Push each user's mobile number and name as an array
        users.push([item.MOBILE_NUMBER, item.NAME]);
      });
    });
  });

  it('Uses the user array', () => {
    if (users.length > 0) {
      users.forEach((user) => {
        const mobileNumber = user[0]; // Access the mobile number
        const name = user[1]; // Access the name
        cy.log(`Mobile Number: ${mobileNumber}, Name: ${name}`);
      });
    } else {
      cy.log('User array is empty or not set');
    }
  });
});
