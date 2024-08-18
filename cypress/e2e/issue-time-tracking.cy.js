/*POM approach - before running, download TimeTracking.js to your ../pages folder from here:

*/

import TimeTracking from '../pages/TimeTracking';

describe('Time tracking', () => {
  const originalEstimateHours = '10';
  const updatedEstimateHours = '20';
  const timeSpent = '2';
  const timeRemaining = '5';

  beforeEach(() => {
    cy.visit('/');
    cy.url()
      .should('eq', `${Cypress.env('baseUrl')}project/board`)
      .then((url) => {
        cy.visit(url + '/board');
        TimeTracking.getIssueDetailModal();
      });
  });

  it('Should test time estimation functionality', () => {
    // Reset time tracker and estimate hours on existing task:
    TimeTracking.clearEstimateHours();
    TimeTracking.clearTimeTrackingModal();
    TimeTracking.checkNoTimeLoggedIsVisible();
    // Add estimation 10h and validate:
    TimeTracking.insertEstimateHours(originalEstimateHours);
    TimeTracking.closeIssueDetailModal();
    cy.reload();
    TimeTracking.getIssueDetailModal();
    TimeTracking.validateEstimationValue(originalEstimateHours);
    TimeTracking.ValidateTimeTrackerSync(originalEstimateHours);
    // Update estimation to 20h and validate:
    TimeTracking.insertEstimateHours(updatedEstimateHours);
    TimeTracking.closeIssueDetailModal();
    cy.reload();
    TimeTracking.getIssueDetailModal();
    TimeTracking.validateEstimationValue(updatedEstimateHours);
    TimeTracking.ValidateTimeTrackerSync(updatedEstimateHours);
    // Remove estimation and validate removal:
    TimeTracking.clearEstimateHours();
    TimeTracking.closeIssueDetailModal();
    cy.reload();
    TimeTracking.getIssueDetailModal();
    TimeTracking.validateEstimateHoursRemoval();
  });

  it('Should test time logging functionality', () => {
    // Adding original estimation 10h:
    TimeTracking.insertEstimateHours(originalEstimateHours);
    // Log time:
    TimeTracking.getTimeTrackingModal();
    TimeTracking.insertTimeSpent(timeSpent);
    TimeTracking.insertTimeRemaining(timeRemaining);
    TimeTracking.clickDoneButton();
    TimeTracking.checkNoTimeLoggedIsNotVisible();
    TimeTracking.checkTimeLoggedRemaining(timeSpent, timeRemaining);
    // Remove logged time:
    TimeTracking.clearTimeTrackingModal();
    TimeTracking.checkNoTimeLoggedIsVisible();
    TimeTracking.ValidateTimeTrackerSync(originalEstimateHours);
  });
});
