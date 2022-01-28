// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="Cypress" />

describe('CryptoTradingApp shows', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://data.messari.io/api/v2/assets?with-profiles', { fixture: 'assets.json' })
  })

  it('Auth API check', () => {
    cy.request('http://localhost:8080/api/signin').as('c')
    cy.get('@c').should((response) => {
      find('accessToken')
      find('cryptotradingapp1234567890')
    })
  })

  it('check usd price hidden when logout', () => {
    cy.visit('/')
    cy.get('#trading').click()
    cy.get('#fiat').should('not.exist')
  })

  it('do work login form open', () => {
    cy.visit('/')
    cy.get('#login').click()
    cy.get('#modal').should('be.visible')
  })

  it('do work login form close', () => {
    cy.get('#close').click()
    cy.get('#modal').should('not.exist')
  })

  it('do work login form function', () => {
    cy.get('#login').click()
    cy.get('#email').type('test')
    cy.get('#password').type('test')
    cy.get('#submit').click()
    cy.get('#userinfo').then(function(e){
      const t = e.text()
      expect(t).to.contains('cryptotradingapp1234567890')
    })
  })

  it('check home nav', () => {
    cy.get('#home').click()
    cy.location().should((loc) => {
      expect(loc.host).to.eq('localhost:3000')
      expect(loc.hostname).to.eq('localhost')
      expect(loc.href).to.eq(
        'http://localhost:3000/'
      )
    })
  })

  it('check default list count of home', () => {
    cy.get('#assetboard').find('img').should('have.length', 10)
  })

  it('check expand list count of home', () => {
    cy.get('#expand').click()
    cy.get('#assetboard').find('img').should('have.length.greaterThan', 10)
  })

  it('check buy and sell dropdown of home list', () => {
    cy.get('#expand').click()
    cy.get('#assetboard').find('Buy').should('not.exist')
    cy.get('#assetboard').find('Sell').should('not.exist')
    cy.get('#assetboard').children().find('span').first().trigger('mousedown')
    cy.get('#buysel0').should('have.css', 'display', 'none').invoke('show')
    cy.get('#buysel0').contains('Buy').click()
    cy.get('#buysel0').contains('Sell').click()
  })

  it('check trading nav', () => {
    cy.get('#trading').click()
    cy.location().should((loc) => {
      expect(loc.host).to.eq('localhost:3000')
      expect(loc.hostname).to.eq('localhost')
      expect(loc.href).to.eq(
        'http://localhost:3000/trading'
      )
    })
  })

  it('check crypto asset dropdown', () => {
    cy.get('#swapasset').trigger('mouseover')
    cy.get('#swaplist').find('p').first().then((e) => {
      const t = e.text()
      expect(t).to.contains('BTC')
    })
  })

  it('calculate fiat amount from crypto amount', () => {
    cy.get('#crypto').type('1')
    cy.get('#fiat').then((e) => {
      const t = e.val()
      expect(t).to.eq('37169.12')
    })
  })

  it('calculate fiat amount from asset', () => {
    cy.get('#crypto').clear().type('1')
    cy.get('#swaplist').should('have.css', 'display', 'none').invoke('show')
    cy.get('#swaplist').children().each((e, index) => {
      if (index === 2) { // select third item
        cy.wrap(e).click()
      }
    })
    cy.get('#fiat').then((e) => {
      const t = e.val()
      expect(t).to.eq('1.00')
    })
  })
})
