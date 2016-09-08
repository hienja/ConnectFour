var color = 'red'

document.addEventListener('DOMContentLoaded', function(){
  document.getElementById('container').onclick = function(event){
    var column = event.target.classList.contains('first');
    if (column){
      var children = event.target.parentElement.children;
      var condition = true; 
      for(var i = children.length - 1; i >= 0 && condition ; i--) {
        if(children[i].className !== 'red' && children[i].className !== 'yellow') {
          children[i].className = color;
          condition = false;
        }
      }
      color = color === 'red' ? 'yellow' : 'red';
    }
  };
});