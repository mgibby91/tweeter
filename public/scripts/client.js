/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

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

  return `
  <article class="tweet-container">
  <header>
  <div class="tweet-left-header">
  <img src="${tweet.user.avatars}" alt="">
  <p class='tweet-username'>${tweet.user.name}</p>
  </div>
  <a href="#">${tweet.user.handle}</a>
  </header>
  <div class="tweet-text">${tweet.content.text}</div>
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

renderTweets(data);