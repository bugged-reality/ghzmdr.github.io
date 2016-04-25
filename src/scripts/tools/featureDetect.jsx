export default function featureDetect() {
    if (!isTouch()) {
        document.body.classList.add('no-touch')
    }
}

function isTouch() {
    if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
      return true
    }

    return false
}