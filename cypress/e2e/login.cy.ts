/// <reference types="cypress" />

describe('login', () => {
	it('should be able to login', () => {
		cy.login(Cypress.env('email'), Cypress.env('password'));
	});
});

export {};
