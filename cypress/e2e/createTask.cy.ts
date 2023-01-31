/// <reference types="cypress" />

describe('create task', () => {
	it('should be able to create task', () => {
		cy.login(Cypress.env('email'), Cypress.env('password'));

		cy.get('#cy-add').click();

		cy.get('input[name="name"]').type('task test');
		cy.get('input[name="description"]').type('task test');
		cy.get('input[type="number"]').type('5');
		cy.get('input[type="date"]').type('2022-10-10');

		cy.get('button[type="submit"]').click();

		cy.get('#cy-delete').click();
	});
});

export {};
