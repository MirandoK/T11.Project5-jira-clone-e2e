class TimeTracking {
  constructor() {
    this.issueBoard = '[data-testid="list-issue"]';
    this.issueDetailModal = '[data-testid="modal:issue-details"]';
    this.timeTrackingModal = '[data-testid="modal:tracking"]';
    this.estimateHours = 'input[placeholder="Number"]';
    this.timeSpent = 'Time spent';
    this.timeRemaining = 'Time remaining';
    this.buttonName = 'button';
    this.newTimeLogged = '2h logged';
    this.newTimeRemaining = '5h remaining';
    this.closeDetailModalButton = '[data-testid="icon:close"]';
  }

  getIssueDetailModal() {
    cy.get(this.issueBoard).contains('This is an issue of type: Task.').click();
    cy.get(this.issueDetailModal).should('be.visible');
  }

  clearEstimateHours() {
    cy.get(this.issueDetailModal).within(() => {
      cy.get(this.estimateHours).clear().wait(3000);
    });
  }

  insertEstimateHours(originalEstimateHours, updatedEstimateHours) {
    cy.get(this.estimateHours)
      .clear()
      .type(originalEstimateHours, updatedEstimateHours)
      .wait(3000);
  }

  validateEstimationValue(originalEstimateHours, updatedEstimateHours) {
    cy.get(this.estimateHours).should(
      'have.value',
      originalEstimateHours,
      updatedEstimateHours
    );
  }

  validateEstimateHoursRemoval() {
    cy.get(this.issueDetailModal).within(() => {
      cy.get(this.estimateHours)
        .should('have.value', '')
        .and('have.attr', 'placeholder', 'Number');
    });
  }

  ValidateTimeTrackerSync(originalEstimateHours, updatedEstimateHours) {
    cy.contains(originalEstimateHours, updatedEstimateHours).should(
      'exist'
    );
  }

  getTimeTrackingModal() {
    cy.contains('Time Tracking').next().click();
    cy.get(this.timeTrackingModal).should('be.visible');
  }

  insertTimeSpent(timeSpent) {
    cy.contains(this.timeSpent)
      .next('div')
      .find('input')
      .clear()
      .type(timeSpent)
      .should('have.value', timeSpent);
  }

  insertTimeRemaining(timeRemaining) {
    cy.contains(this.timeRemaining)
      .next('div')
      .find('input')
      .clear()
      .type(timeRemaining)
      .should('have.value', timeRemaining);
  }

  clearTimeTrackingModal() {
    cy.contains('Time Tracking').next().click();
    cy.get(this.timeTrackingModal)
      .should('be.visible')
      .within(() => {
        cy.contains(this.timeSpent)
          .next('div')
          .find('input')
          .clear()
          .should('have.value', '');
        cy.contains(this.timeRemaining)
          .next('div')
          .find('input')
          .clear()
          .should('have.value', '');
        cy.get(this.buttonName).contains('Done').click();
        cy.get(this.timeTrackingModal).should('not.exist');
      });
  }

  checkNoTimeLoggedIsVisible() {
    cy.contains('No time logged').should('be.visible');
  }

  checkNoTimeLoggedIsNotVisible() {
    cy.contains('No time logged').should('not.exist');
  }

  checkTimeLoggedRemaining() {
    cy.contains(this.newTimeLogged).should('exist');
    cy.contains(this.newTimeRemaining).should('exist');
  }

  clickDoneButton() {
    cy.get(this.buttonName).contains('Done').click();
    cy.get(this.timeTrackingModal).should('not.exist');
  }

  closeIssueDetailModal() {
    cy.get(this.issueDetailModal).within(() => {
      cy.get(this.closeDetailModalButton).first().click();
    });
    cy.get(this.issueDetailModal).should('not.exist');
  }
}

export default new TimeTracking();
