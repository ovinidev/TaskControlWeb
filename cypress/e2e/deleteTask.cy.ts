/// <reference types="cypress" />

describe('create task', () => {
	it('should be able to create task', () => {
		cy.login(Cypress.env('email'), Cypress.env('password'));

		cy.get('#cy-delete').click();
	});
});

export {};
