let _timeoutId
let _idleCallBack = null
let _notIdleEvents = [
    'mousedown',
    'mousemove',
    'keypress',
    'scroll',
    'touchstart'
]
const _FIVE_SECONDS_IN_MS = 5 * 60 * 1000

const IdleService = {
    setIdleCallback(idleCallback) {
        _idleCallBack = idleCallback
    },
    resetIdleTimer(ev) {
        clearTimeout(_timeoutId)
        _timeoutId = setTimeout(_idleCallBack, _FIVE_SECONDS_IN_MS)
    },
    registerIdleTimerResets() {
        _notIdleEvents.forEach(event =>
            document.addEventListener(
                event,
                IdleService.resetIdleTimer,
                true
            )
        )
    },
    unRegisterIdleResets() {
        clearTimeout(_timeoutId)
        _notIdleEvents.forEach(event =>
            document.removeEventListener(
                event,
                IdleService.resetIdleTimer,
                true
            )
        )
    }
}

export default IdleService