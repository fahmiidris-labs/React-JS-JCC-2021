var filterBooksPromise = require('./promise2.js')

// Jawab
// Syncronous
function syncgetBooks(page, color) {
    filterBooksPromise(page, color).then(function (result) {
        console.log(result)
    }).catch(function (err) {
        console.log(err.message)
    })
}

// Async - Await
async function asyncGetBooks(page, color) {
    try {
        var result = await filterBooksPromise(page, color)
        console.log(result)
    } catch (err) {
        console.log(err.message)
    }
}


syncgetBooks(true, 40)
asyncGetBooks(false, 250)
asyncGetBooks(true, 30)