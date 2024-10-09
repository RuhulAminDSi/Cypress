describe('', ()=>{
    const url  =  'https://nsa.ipemis.qa.innovatorslab.net/login';
    const userpage = 'https://nsa.ipemis.qa.innovatorslab.net/user/create';
    it('', ()=>{
        cy.get('select#nsaUserList0\\.nsaRole').select('NSA_ADMIN');
        nsaUserList0.nameLocal
        cy.get('#nsaUserList0\\.nameLocal').type('এডমিন');
        cy.get('#nsaUserList0\\.name').type('NSA_ADMIN');
        cy.get('#nsaUserList0\\.mobileNumber').type('01521555170');
        nsaUserList0.gender
        cy.get('select#nsaUserList0\\.gender').select('MALE');
        cy.get('div a#add-nsa-user').click();
    })
})