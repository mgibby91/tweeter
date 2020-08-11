/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {


  // const data = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com/73hZDYK.png"
  //       ,
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": "https://i.imgur.com/nlhLi3I.png",
  //       "handle": "@rd"
  //     },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1461113959088
  //   }
  // ];

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

  }

  const createTweetElement = function(tweet) {

    const timeSincePosted = timeSince(tweet.created_at);

    const escape = function(str) {
      let div = document.createElement('div');
      div.textContent = str;
      // div.setAttribute('class', 'tweet-text');
      return div.innerHTML;
    }

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

  }

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-main-container').append($tweet);
    }
  }

  // renderTweets(data);



  // Form submission
  const formSubmission = function(e) {

    e.preventDefault();

    const data = $(this).serialize();
    const URL = $('.tweet-form').attr('action');

    if (!data.split('=')[1]) {
      alert('Please enter text in tweet!');
      return;
    }

    if (data.split('=')[1].length > 140) {
      alert('Please stay within character limit!');
      return;
    }

    $.post(URL, data)
      .then(function() {
        console.log('Success: ', data);
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
        console.log('error: ', error)
      })

  }

  $('.tweet-form').submit(formSubmission)


  // Fetch tweets from db in form of JSON
  function loadTweets() {

    $.ajax('/tweets', { method: 'GET' })
      .then(function(tweetsJSON) {
        console.log('success: ', tweetsJSON);
        renderTweets(tweetsJSON);
      }).catch(function(err) {
        console.log('Error!', err);
      });

  };

  loadTweets();



});
