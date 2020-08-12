/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const timeSince = function(date) {

    let seconds = Math.floor((new Date() - date) / 1000);

    let interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";

  };

  const createTweetElement = function(tweet) {

    const timeSincePosted = timeSince(tweet.created_at);

    const escape = function(str) {
      let div = document.createElement('div');
      div.textContent = str;
      return div.innerHTML;
    };

    return `
  <article class="tweet-container">
  <header>
  <div class="tweet-left-header">
  <img src="${tweet.user.avatars}" alt="">
  <p class='tweet-username'>${tweet.user.name}</p>
  </div>
  <a href="#">${tweet.user.handle}</a>
  </header>
  <div class="tweet-text">${escape(tweet.content.text)}</div>
  <footer>
  <p class='tweet-time-posted'>${timeSincePosted} ago</p>
  <div class="tweet-right-footer">
  <a href="#"><i class="fas fa-flag"></i></a>
  <a href="#"><i class="fas fa-retweet"></i></a>
  <a href="#"><i class="fas fa-heart"></i></a>
  </div>
  </footer>
  </article>
  `;

  };

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-main-container').append($tweet);
    }
  };

  const errorMessage = $('.error-message');
  // change from 'none' to 'flex' right before hide so error doesn't flash on page refresh/load
  errorMessage.css('display', 'flex');
  // hide on load to use slideDown() in form submission function
  errorMessage.hide();

  // Form submission
  const formSubmission = function(e) {

    const errorText = errorMessage.children('p');

    e.preventDefault();

    const data = $(this).serialize();
    const URL = $('.tweet-form').attr('action');

    if (!data.split('=')[1]) {
      errorText.text('No characters provided. Please submit tweet with valid text!');
      errorMessage.slideDown(300);
      return;
    }

    if ($(this)[0][0].value.length > 140) {
      errorText.text('Too many characters provided. Please submit tweet with valid text!');
      errorMessage.slideDown(300);
      return;
    }

    $.post(URL, data)
      .then(function() {
        console.log('Success: ', data);
        // slide error message back up before tweet submission
        errorMessage.slideUp(200);

        // remove all tweet posts from tweets container
        $('#tweets-main-container').empty();
        // reset the textarea to empty
        $('#tweet-text').val('');
        // reset the counter back to 140
        $('.counter').val(140);
        // load tweets from DB
        loadTweets();
      })
      .catch(function(error) {
        console.log('error: ', error);
      });

  };

  $('.tweet-form').submit(formSubmission);


  // Fetch tweets from db in form of JSON
  function loadTweets() {

    $.ajax('/tweets', { method: 'GET' })
      .then(function(tweetsJSON) {
        console.log('success: ', tweetsJSON);
        renderTweets(tweetsJSON);
      }).catch(function(err) {
        console.log('Error!', err);
      });

  }

  loadTweets();

  // toggling form for entering tweet

  const toggleTweetForm = function(e) {

    const newTweet = $('.new-tweet');
    newTweet.slideToggle();

  };

  $('#write-tweet-btn').click(toggleTweetForm);


});
