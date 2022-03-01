const srcResult = document.getElementById('search-result')
const singleDetails = document.getElementById('single-details')
const error = document.getElementById('error')
let search = ''

const loadPhones = async () => {
    const searchField = document.getElementById('search-text')
    search = searchField.value.toLowerCase() // averting case-sensitivity
    //clearing all sorts of inner content on each search click
    searchField.value = ''
    srcResult.textContent = ''
    singleDetails.textContent = ''
    error.innerText = ''
    document.getElementById('show-all').style.display = 'none'

    //numeric value and empty string validating
    if (!isNaN(search) || search == '') {
        error.innerText = 'Please write something'
    } else {
        showSpinner()
        const url = `https://openapi.programming-hero.com/api/phones?search=${search}`
        try {
            const res = await fetch(url)
            const data = await res.json()
            if (res) {
                hideSpinner()
                show20Result(data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
}

//Phone div
const showPhone = (image, name, brand, id) => {
    const div = document.createElement('div')
    div.classList.add('col', 'text-center', 'p-4')
    div.innerHTML = `
       <div class="border rounded shadow-lg p-3">
            <img src="${image}">
            <h5 class="mt-1">${name}</h5>
            <p>${brand}</p>
            <button onclick="loadSingle('${id}')" class="btn btn-warning">Explore</button>
       </div>
    `
    srcResult.appendChild(div)
}

// Twenty search result block
const show20Result = phones => {
    let counter = 0
    if (phones.length == 0) {
        error.innerText = 'No phone found!'
    }
    phones.forEach(phone => {
        if (counter == 20) {
            document.getElementById('show-all').style.display = 'block'
            return
        }
        showPhone(phone.image, phone.phone_name, phone.brand, phone.slug)
        counter++
    })
}

//Show all results once click on the show all button
document.getElementById('show-all').addEventListener('click', async () => {
    document.getElementById('show-all').style.display = 'none'
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`
    showSpinner()
    try {
        const res = await fetch(url)
        const data = await res.json()
        if (res) {
            hideSpinner()
            showAllResult(data.data)
        }
    } catch (error) {
        console.log(error)
    }
})

const showAllResult = phones => {
    srcResult.textContent = ''
    phones.forEach(phone => {
        showPhone(phone.image, phone.phone_name, phone.brand, phone.slug)
    })
}

//Single item details block
const loadSingle = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    try {
        const res = await fetch(url)
        const data = await res.json()
        showsingleDetails(data.data)
    } catch (error) {
        console.log(error)
    }
}

const showsingleDetails = phone => {
    singleDetails.textContent = ''
    const div1 = document.createElement('div')
    div1.classList.add('col-lg-3', 'col-12', 'p-3', 'text-center')
    div1.innerHTML = `
        <img src="${phone.image}">
        <h5 class="mt-1">${phone.name}</h5>
        <p>${phone.releaseDate ? phone.releaseDate : 'No release date found'}</p>
    `
    const div2 = document.createElement('div')
    div2.classList.add('col-lg-9', 'col-12', 'p-3')
    div2.innerHTML = `
        <h3>Main features</h3>
        <hr class="mt-1 mb-1">
        <h6 class="d-inline">Chipset:</h6> ${phone?.mainFeatures?.chipSet} <br>
        <h6 class="d-inline">Display:</h6> ${phone?.mainFeatures?.displaySize} <br>
        <h6 class="d-inline">Memory:</h6> ${phone?.mainFeatures?.memory} <br>
        <h6 class="d-inline">Sensor:</h6> ${phone?.mainFeatures?.sensors}
        <h3 class="mt-2">Others</h3>
        <hr class="mt-0 mb-1">
        <h6 class="d-inline">Bluetooth:</h6> ${phone?.others?.Bluetooth} <br>
        <h6 class="d-inline">GPS:</h6> ${phone?.others?.GPS} <br>
        <h6 class="d-inline">NFC:</h6> ${phone?.others?.NFC} <br>
        <h6 class="d-inline">USB:</h6> ${phone?.others?.USB}    
    `
    singleDetails.appendChild(div1)
    singleDetails.appendChild(div2)
}

//Spinner
const hideSpinner = () => {
    document.getElementById('spinner').style.display = 'none'
}
hideSpinner()
const showSpinner = () => {
    document.getElementById('spinner').style.display = 'block'
}