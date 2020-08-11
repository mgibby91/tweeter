
$(document).ready(function() {

  const callback = function() {

    const charLeft = 140 - this.value.length;
    console.log(charLeft);

    // update counter with chars left
    const counter = this.parentElement.children[2].children[1]
    counter.textContent = charLeft;

    // change color to red when counter < 0 
    charLeft < 0 ? counter.classList.add('counter-negative') : counter.classList.remove('counter-negative');
  };

  $('#tweet-text').keyup(callback);

});