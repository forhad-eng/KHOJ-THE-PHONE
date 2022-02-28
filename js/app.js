const srcResult = document.getElementById('search-result')
const singleDetails = document.getElementById('single-details')
const error = document.getElementById('error')

const loadPhones = async () => {
    const searchField = document.getElementById('search-text')
    const search = searchField.value.toLowerCase()
    if (!isNaN(search) || search == '') {
        error.innerText = 'Please write something'
    } else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${search}`
        try {
            const res = await fetch(url)
            const data = await res.json()
            console.log(data.data)
        } catch (error) {
            console.log(error)
        }
    }
}