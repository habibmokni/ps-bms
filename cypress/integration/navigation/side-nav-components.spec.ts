describe('Navigation - SideNav - Components', () => {
    it('should have a link for each item in Components in the SideNav', () => {
        cy.visit('/dashboard');
        cy.get('sbpro-side-nav-item')
            .contains(/^\s*Components\s*$/)
            .click();
        cy.get('sbpro-side-nav-item')
            .contains(/^\s*Alerts\s*$/)
            .click();
        cy.location('pathname').should('eq', '/dashboard/components/alerts');
        cy.get('sbpro-side-nav-item')
            .contains(/^\s*Buttons\s*$/)
            .click();
        cy.location('pathname').should('eq', '/dashboard/components/buttons');
        cy.get('sbpro-side-nav-item')
            .contains(/^\s*Cards\s*$/)
            .click();
        cy.location('pathname').should('eq', '/dashboard/components/cards');
        cy.get('sbpro-side-nav-item')
            .contains(/^\s*Dropdowns\s*$/)
            .click();
        cy.location('pathname').should('eq', '/dashboard/components/dropdowns');
        cy.get('sbpro-side-nav-item')
            .contains(/^\s*Forms\s*$/)
            .click();
        cy.location('pathname').should('eq', '/dashboard/components/forms');
        cy.get('sbpro-side-nav-item')
            .contains(/^\s*Modal\s*$/)
            .click();
        cy.location('pathname').should('eq', '/dashboard/components/modal');
        cy.get('sbpro-side-nav-item')
            .contains(/^\s*Navigation\s*$/)
            .click();
        cy.location('pathname').should('eq', '/dashboard/components/navigation');
        cy.get('sbpro-side-nav-item')
            .contains(/^\s*Progress\s*$/)
            .click();
        cy.location('pathname').should('eq', '/dashboard/components/progress');
        cy.get('sbpro-side-nav-item')
            .contains(/^\s*Toasts\s*$/)
            .click();
        cy.location('pathname').should('eq', '/dashboard/components/toasts');
        cy.get('sbpro-side-nav-item')
            .contains(/^\s*Tooltips\s*$/)
            .click();
        cy.location('pathname').should('eq', '/dashboard/components/tooltips');
    });
});
