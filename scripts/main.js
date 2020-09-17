var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var PREVIOUS_SELECTOR = '[button-role="previous pic"]';
var NEXT_SELECTOR = '[button-role="next pic"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;

var thumb_array = getThumbnailsArray();
var i = 0;

function setDetails(imageUrl, titleText) {
    'use strict';
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
    'use strict';
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function assignIterator(thumb) {
    'use strict';
    thumb.classList.add(i);
    i = i + 1;
}

function addThumbClickHandler(thumb) {
    'use strict';
    thumb.addEventListener('click', function (event) {
        event.preventDefault();
        i = parseInt(thumb.class);
        setDetailsFromThumb(thumb);
        showDetails();
    });
}

function getThumbnailsArray() {
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

function hideDetails() {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
    'use strict';
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function () {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
}

function previousItem() {
    'use strict';
    if (i === 0) {
        i = thumb_array.length;
    }
    i = i - 1;
    return thumb_array[i];
}

function nextItem() {
    'use strict';
    i = i + 1;
    i = i % thumb_array.length;
    return thumb_array[i];
}

function addPreviousPressHandler() {
    'use strict';
    var previous = document.querySelector(PREVIOUS_SELECTOR);
    previous.addEventListener('click', function (event) {
        event.preventDefault();
        setDetailsFromThumb(previousItem());
    });
}

function addNextPressHandler() {
    'use strict';
    var next = document.querySelector(NEXT_SELECTOR);
    next.addEventListener('click', function (event) {
        event.preventDefault();
        setDetailsFromThumb(nextItem());
    });
}

function addKeyPressHandler() {
    'use strict';
    document.body.addEventListener('keyup', function (event) {
        event.preventDefault();
        console.log(event.keyCode);
        if (event.keyCode === ESC_KEY) {
            hideDetails();
        }
    });
}

function initializeEvents() {
    'use strict';
    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(assignIterator);
    i = 0;
    thumbnails.forEach(addThumbClickHandler);
    addPreviousPressHandler();
    addNextPressHandler();
    addKeyPressHandler();
}

initializeEvents();