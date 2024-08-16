describe('Issue comments creating, editing and deleting', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url()
      .should('eq', `${Cypress.env('baseUrl')}project/board`)
      .then((url) => {
        cy.visit(url + '/board');
        cy.contains('This is an issue of type: Task.').click();
      });
  });

  //Variables declared as functions:
  const getIssueDetailsModal = () =>
    cy.get('[data-testid="modal:issue-details"]');
  const getCommentInsertionField = () =>
    cy.get('textarea[placeholder="Add a comment..."]');
  const getSavedCommentField = () => cy.get('[data-testid="issue-comment"]');
  const getSaveButton = () =>
    cy.contains('button', 'Save').click().should('not.exist');
  const getEditButton = () => cy.contains('Edit').click().should('not.exist');
  const getDeleteButton = () => cy.contains('button', 'Delete');
  const getDeletionConfirmationModal = () =>
    cy.get('[data-testid="modal:confirm"]');

  //Combined test:
  it('Should create, edit and delete comment successfully', () => {
    //Variables for data:
    const comment = 'My comment about the issue, Mirando';
    const editedComment = 'My new comment, Mirando';

    //Creating a new comment:
    getIssueDetailsModal().within(() => {
      cy.contains('Add a comment...').type(comment);
      getSaveButton().wait(3000);
      getSavedCommentField()
        .should('have.length', '2')
        .first()
        .should('contain', comment);

      //Editing the previously created comment:
      getSavedCommentField()
        .first()
        .within(() => {
          getEditButton();
        });
      getCommentInsertionField()
        .should('contain', comment)
        .clear()
        .type(editedComment);
      getSaveButton();
      getSavedCommentField()
        .should('have.length', '2')
        .first()
        .should('contain', editedComment)
        .and('not.contain', comment);
    });
    //Deleting the previously edited comment:
    getSavedCommentField().first().contains('Delete').click();
    getDeletionConfirmationModal().should(
      'contain',
      'Are you sure you want to delete this comment?'
    );
    getDeleteButton().click().wait(5000);
    getSavedCommentField()
      .should('have.length', '1')
      .should('not.contain', editedComment)
      .and('not.contain', comment);
  });

  it('Should create a comment successfully', () => {
    const comment = 'TEST_COMMENT';

    getIssueDetailsModal().within(() => {
      cy.contains('Add a comment...').click();

      cy.get('textarea[placeholder="Add a comment..."]').type(comment);

      cy.contains('button', 'Save').click().should('not.exist');

      cy.contains('Add a comment...').should('exist');
      cy.get('[data-testid="issue-comment"]').should('contain', comment);
    });
  });

  it('Should edit a comment successfully', () => {
    const previousComment = 'An old silent pond...';
    const comment = 'TEST_COMMENT_EDITED';

    getIssueDetailsModal().within(() => {
      cy.get('[data-testid="issue-comment"]')
        .first()
        .contains('Edit')
        .click()
        .should('not.exist');

      cy.get('textarea[placeholder="Add a comment..."]')
        .should('contain', previousComment)
        .clear()
        .type(comment);

      cy.contains('button', 'Save').click().should('not.exist');

      cy.get('[data-testid="issue-comment"]')
        .should('contain', 'Edit')
        .and('contain', comment);
    });
  });

  it('Should delete a comment successfully', () => {
    getIssueDetailsModal()
      .find('[data-testid="issue-comment"]')
      .contains('Delete')
      .click();

    cy.get('[data-testid="modal:confirm"]')
      .contains('button', 'Delete comment')
      .click()
      .should('not.exist');

    getIssueDetailsModal()
      .find('[data-testid="issue-comment"]')
      .should('not.exist');
  });
});
