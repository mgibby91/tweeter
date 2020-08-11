
$(document).ready(function() {

  const callback = function() {

    const charLeft = 140 - this.value.length;
    console.log(charLeft);

    // update counter with chars left
    const counter = this.parentElement.children[2].children[1];
    counter.textContent = charLeft;

    // change color to red when counter < 0 
    charLeft < 0 ? counter.classList.add('counter-negative') : counter.classList.remove('counter-negative');
  };

  $('#tweet-text').keyup(callback);

  const scrollBtn = $('#scroll-btn');

  // button display when scroll function
  const buttonDisplay = function() {

    if ($(document).scrollTop() > 100) {
      scrollBtn.show();
    } else {
      scrollBtn.hide();
    }
  }

  $(window).scroll(buttonDisplay);

  // bring client to page top on button click

  const scrollPageTop = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollBtn.click(scrollPageTop);

});