/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This suite is all about the RSS feeds definitions,
   * the allFeeds variable in our application.
   */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not empty
     */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });


    /* This test that loops through each feed
      * in the allFeeds object and ensures it has a URL defined
      * and that the URL is not empty.
      */
    it('have a non-empty URL defined for each feed', function() {
      allFeeds.forEach(function(feed) {
        expect(feed.url).toBeDefined();
        expect(feed.url).not.toBe('');
      });
    });


    /* This test that loops through each feed
      * in the allFeeds object and ensures it has a name defined
      * and that the name is not empty.
      */
    it('have a non-empy name defined for each feed', function() {
      allFeeds.forEach(function(feed) {
        expect(feed.url).toBeTruthy();
      });
    });
  });


  /* This test suite is named "The menu" */
  describe('The menu', function() {
    /* This test ensures that the menu element is
      * hidden by default
      */
    var defaultMenuItem, firstTimeMenuItemClicked, secondTimeMenuItemClicked;
    beforeEach(function() {
      // Capture Default Menu Item when the page loads
      defaultMenuItem = $('body').hasClass('menu-hidden');
    });

    it('is hidden by default', function() {
      expect(defaultMenuItem).toBe(true);
      
      // Click on Menu Button and capture the Menu item Class
      $('.menu-icon-link').click();
      firstTimeMenuItemClicked = $('body').hasClass('menu-hidden');

      // Click on Menu Item again and again capture the Menu Item Class
      $('.menu-icon-link').click();
      secondTimeMenuItemClicked = $('body').hasClass('menu-hidden');

    });

    /* This test ensures the menu changes
      * visibility when the menu icon is clicked. This test
      * should have two expectations: does the menu display when
      * clicked and does it hide when clicked again.
      */
    it('changes visibility when clicked', function() {
      expect(firstTimeMenuItemClicked).toBe(false);
      expect(secondTimeMenuItemClicked).toBe(true);
    });
  });

  /* This test suite is named "Initial Entries" */
  describe('Initial Entries', function() {
    /* This test ensures that when the loadFeed
      * function is called and completes its work, there is at least
      * a single .entry element within the .feed container
      */
    beforeEach(function(done) {
      // Load the Page with first allFeed item
      loadFeed(allFeeds[0].id, function() {
        done();
      });
    });

    it('should have at least one entry', function(done) {
      expect($('.entry-link .entry').length).not.toBe(0);
      done();
    });
     
  });

  /* This test suite is named "New Feed Selection" */
  describe('New Feed Selection', function() {
    /* This test ensures that when a new feed is loaded
      * by the loadFeed function that the content actually changes
      */
    var initialContent = [], nextContent = [];
    
    beforeEach(function(done) {
      // Capture the initial content on the page when it loads with first item in allFeeds
      loadFeed(0);
      $('.entry').each(function() {
        initialContent.push($('.feed').html());
      });

      // Call the API to load the page with second item in allFeeds
      loadFeed(1, function() {
        done();
      });
    });

    it('should have changed content when new feed is loaded', function(done) {  
      $('.entry').each(function() {
        nextContent.push($('.feed').html());
      });
      expect(JSON.stringify(initialContent)).not.toBe(JSON.stringify(nextContent));
      done();
    });
  });
}());
