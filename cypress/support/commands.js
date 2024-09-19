// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import 'cypress-file-upload';
import {allObject} from "./allObject";
const allObj = new allObject();


Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

Cypress.Commands.add('login', () =>{
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
    cy.visit('/')
    cy.get('button[type = "button"]').contains('বাংলা').click();
    cy.get('div a').contains('English').click();
})
Cypress.Commands.add('logIn', (username, password) =>{
    // cy.session([username, password], () =>
    {
        cy.get(allObj.getUserName()).type(username);
        cy.get(allObj.getPassword()).type(password);
        cy.get(allObj.getSubmit()).click();
    }
        // {
        //     cacheAcrossSpecs: true
        // }
    // )
})
Cypress.Commands.add('logOut', ()=>{
    cy.get('#dropDownMenuButton').click()
    cy.get('div a span').contains('Sign Out').click();
})

  
  
  