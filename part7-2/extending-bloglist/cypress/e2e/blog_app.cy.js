describe('Blog app', function() {
  beforeEach(function() {
    
    cy.request('POST', 'http://localhost:3003/api/test/reset')

    const user = {
      name: 'Cheeseje',
      username: 'kaas5',
      password: '123456'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
  
    cy.contains('Blogs')
    cy.contains('Login')
  })




  it('Login form is shown', function() {

    cy.contains('Login')
  })

  it('succeeds with correct credentials', function() {
      
  cy.get('#username').type('kaas5')
  cy.get('#password').type('123456')
  cy.get('#login-button').click()

  cy.contains('Cheeseje logged-in')
  })

  it('fails with wrong credentials', function() {
    
    cy.get('#login-button').click()

  cy.contains('Wrong username or password')
    
  })
})


describe('When logged in', function() {
  beforeEach(function() {
  cy.get('#username').type('kaas5')
  cy.get('#password').type('123456')
  cy.get('#login-button').click()
  }) 

  it('A blog can be created', function() {
   
    cy.contains('add blog').click()
    cy.get('#title').type('a blog created by cypress')
    cy.get('#author').type('cypress')
    cy.get('#url').type('niks')
    cy.contains('save').click()
    cy.get('#logout').click()
    
  })
  it('A blog can be Liked', function() {
    // cy.contains('add blog').click()
    // cy.get('#title').type('a blog created by cypress')
    // cy.get('#author').type('cypress')
    // cy.get('#url').type('niks')
    // cy.contains('save').click()
    cy.contains('show more info').click()
    cy.contains('Like').click()
    cy.get('#logout').click()
    
  })

  // describe("and several blogs exist", function () {
  //   beforeEach(function () {
  //   cy.contains('add blog').click()
  //   cy.get('#title').type('blog 2')
  //   cy.get('#author').type('cypress')
  //   cy.get('#url').type('niks')
  //   cy.get('#save').click()
  //   });

 

  it('A blog can be deleted', function() {
  

    cy.contains('add blog').click()
    cy.get('#title').type('blog 2')
    cy.get('#author').type('cypress')
    cy.get('#url').type('niks')
    cy.get('#save').click()
    
    cy.contains('add blog').click()
    cy.get('#title').type('blog 3')
    cy.get('#author').type('cypress')
    cy.get('#url').type('niks')
    cy.get('#save').click()
    // cy.contains('add blog').click()
    
    cy.contains('a blog created by cypress')
    cy.contains('show more info').click()
    cy.contains('remove blog').click()
    cy.get('#logout').click()
  })

  
  it('Like and check', function() {
    // cy.get('#username').type('kaas5')
    // cy.get('#password').type('123456')
    // cy.get('#login-button').click()

    cy.contains("blog 3 cypress").parent().contains("show more info").click();
    cy.contains("Title: blog 3").parent().contains("Like").click();
    cy.contains("Title: blog 3").parent().contains("Like").click();
    // cy.contains("Like").click({force: true})
    cy.visit('http://localhost:3000')
    cy.contains("blog 2 cypress").parent().contains("show more info").click();
    cy.contains("blog 3 cypress").parent().contains("show more info").click();

    cy.get('.blog').eq(0).should('contain', 'blog 3')
    cy.get('.blog').eq(1).should('contain', 'blog 2')
    


  })

})





//Make a test for ensuring that the user who created a blog can delete it.

//Optional bonus exercise: also check that other users cannot delete the blog.

//Make a test which checks that the blogs are ordered according to likes with the blog with the most likes being first.

//This exercise is quite a bit trickier than the previous ones.
// One solution is to add a certain class for the element which wraps the blog's content and use the eq method to get the blog element in a specific index:

//cy.get('.blog').eq(0).should('contain', 'The title with the most likes')
//cy.get('.blog').eq(1).should('contain', 'The title with the second most likes')


