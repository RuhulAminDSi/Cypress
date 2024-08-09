describe('Access Data from JSON File', () => {
    it('Read and use data from JSON file', () => {
        cy.readFile('cypress/fixtures/db_data.json').then((data) => {
            // Iterate through each item in the array
            data.forEach((item, index) => {
                // Log the entire item to inspect its structure
                //cy.log(`Item ${index + 1}: ${JSON.stringify(item)}`);
                cy.log(`${item.MOBILE_NUMBER}`)
                // Check the available properties
                for (const key in item) {
                    cy.log(`Property: ${key}, Value: ${item[key]}`);
                }
            });
        });
    });
});
