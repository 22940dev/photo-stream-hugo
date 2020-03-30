const ESCAPE = 27;
const RIGHT = 39;
const LEFT = 37;
const TARGET_CLASS = 'target';

const clickNavigationButton = (buttonClass) => {
  const id = window.history.state && window.history.state.id;
  if (id) {
    const photo = document.getElementById(id);
    console.log(photo);
    const button = photo.querySelector(buttonClass);
    console.log(button);
    button && button.click();
  }
}

const openPhoto = (id, href) => {
  console.log(`Opening photo ${id}...`);
  const photo = document.getElementById(id);
  const title = photo.getAttribute('title');
  removeTargetClass();
  photo.classList.add(TARGET_CLASS);
  document.title = title;
  if (href) {
    window.history.pushState({id: id}, '', href);
  }
}

const closePhoto = (href) => {
  console.log(`Closing photo...`);
  const title = document.querySelector('head title').getAttribute('data-title');
  removeTargetClass();
  document.title = title;
  if (href) {
    window.history.pushState({}, '', href);
  }
}

const removeTargetClass = () => {
  let targets = document.querySelectorAll(`.${TARGET_CLASS}`);
  targets.forEach((target) => {
    target.classList.remove(TARGET_CLASS);
  });
}

const handleClick = (selector, event, callback) => {
  if (event.target.matches(selector)) {
    callback();
    event.preventDefault();
  }
}

const handleKey = (keyCode, event, callback) => {
  if (event.keyCode === keyCode) {
    callback();
    event.preventDefault();
  }
}

window.onpopstate = function(event) {
  if (event.state && event.state.id) {
    const id = event.state.id;
    openPhoto(id, null);
  } else {
    closePhoto(null);
  }
}

document.addEventListener('keydown', (event) => {
  handleKey(ESCAPE, event, () => {
    clickNavigationButton('.close');
  });

  handleKey(RIGHT, event, () => {
    clickNavigationButton('.next');
  });

  handleKey(LEFT, event, () => {
    clickNavigationButton('.previous');
  });
});

document.addEventListener('click', (event) => {
  handleClick('[data-target][href]', event, () => {
    const id = event.target.getAttribute('data-target');
    const href = event.target.getAttribute('href');
    openPhoto(id, href);
  });

  handleClick('[href].close', event, () => {
    const href = event.target.getAttribute('href');
    closePhoto(href);
  });
});

window.addEventListener('load', (event) => {
  console.log("Loaded !");
  const id = window.location.hash.substr(1);
  if (id != "") {
    openPhoto(id, "#" + id);
  }
  lazyload();
});

