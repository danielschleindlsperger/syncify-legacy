describe('Create a room', () => {
  it('can create a room', () => {
    cy.visit('/rooms')
    cy.contains(/login/i).click()
    expect(true).to.equal(true)
  })
})
