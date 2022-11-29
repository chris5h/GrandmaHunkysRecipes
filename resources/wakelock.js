let wakeLock = null

const acquireLock = async () => {
    try {
        wakeLock = await navigator.wakeLock.request('screen')
        document.body.innerHTML += 'hi dave ';
    } catch (err) {
        console.log(`${err.name}, ${err.message}`)
    }
}

const releaseLock = () => {
    if (wakeLock) {
    wakeLock.release().then(() => {
      wakeLock = null
    })
  }
}

const handleVisibilityChange = () => (
    document.visibilityState === 'hidden' ? releaseLock() : acquireLock()
)

document.addEventListener('visibilitychange', handleVisibilityChange)

window.addEventListener('load', function () {
    acquireLock();
});