

describe('HT', ()=>{
    const htmobile = [
        //'01743235261',
        // '01715731263',
        // '01723769804',
        // '01770445257',
        '01749873799',
        '01745632585',
    ]
    const password = Cypress.env('password');

    Cypress.on('uncaught:exception', (err, runnable) => {
        console.log('Caught an exception:', err);
        return false;
    });
    before('',()=>{
        cy.login();
    })
    it('ForEach hT', ()=>{
        htmobile.forEach((user) => {
            cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });

            cy.logIn(user, password);
            //click add new plan
            // cy.get('#sidebar').scrollTo('bottom')
            // cy.contains('Emergency Applications').scrollIntoView()
            // cy.get('div ul li a span').contains('Emergency Applications').click()
            cy.visit('https://ops.ipemis.qa.innovatorslab.net/eie/my-requests')
            cy.get('div a').contains('New Application').click()
            cy.get('#accident-type').select('5087')
            cy.get('#accidentStartDate').type('09/10/2024')
            cy.get('#accidentEndDate').type('09/10/2024')
            cy.get('#has-other-fund-source').select('0')
            cy.get('#building-abandoned').select('0')
            cy.get('#need-temporary-tin-shed-construction').select('0')
            cy.get('#any-development-project-enlistment').select('0')
            cy.get('#cost-estimation-amount-by-ht').type('50000')
            cy.get('input[type="file"]').attachFile('image.jpg');
            cy.get('#remarks').type('test auto')
            // cy.get('div label span').contains(' Upload image file ').first().attachFile('image.jpg');
            // cy.get('div label span').contains(' Upload image file ').eq(1).attachFile('image.jpg');
            cy.wait(15000)
            cy.get('#request-preview').click()
            cy.get('#request-submit').click()
            cy.get('#confirm-btn-eie-request-submit').contains('Confirm').click();
            cy.logOut()



        })
    })
})