const srcResult = document.getElementById('search-result')
const singleDetails = document.getElementById('single-details')
const error = document.getElementById('error')
let search = ''

const loadPhones = async () => {
    const searchField = document.getElementById('search-text')
    search = searchField.value.toLowerCase()
    searchField.value = ''
    srcResult.textContent = ''
    singleDetails.textContent = ''
    error.innerText = ''

    if (!isNaN(search) || search == '') {
        error.innerText = 'Please write something'

    } else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${search}`
        try {
            const res = await fetch(url)
            const data = await res.json()
            show20Result(data.data)
        } catch (error) {
            console.log(error)
        }
    }
}

// Twenty search result display
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
        const div = document.createElement('div')
        div.classList.add('col-lg-4', 'col-md-4', 'col-sm-8', 'col-8', 'text-center', 'm-auto', 'p-4')
        div.innerHTML = `
           <div class="border rounded shadow-lg p-3">
                <img src="${phone.image}">
                <h5 class="mt-1">${phone.phone_name}</h5>
                <p>${phone.brand}</p>
                <button onclick="loadSingle('${phone.slug}')" class="btn btn-success">Explore</button>
           </div>
        `
        srcResult.appendChild(div)
        counter++
    })
}

//Show all results part once click on show all button
document.getElementById('show-all').addEventListener('click', async () => {
    document.getElementById('show-all').style.display = 'none'
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`
    try {
        const res = await fetch(url)
        const data = await res.json()
        showAllResult(data.data)
    } catch (error) {
        console.log(error)
    }
})

const showAllResult = phones => {
    srcResult.textContent = ''
    phones.forEach(phone => {
        const div = document.createElement('div')
        div.classList.add('col-lg-4', 'col-md-4', 'col-sm-10', 'col-10', 'text-center', 'm-auto', 'p-4')
        div.innerHTML = `
           <div class="border rounded shadow-lg p-3">
                <img src="${phone.image}">
                <h5 class="mt-1">${phone.phone_name}</h5>
                <p>${phone.brand}</p>
                <button onclick="loadSingle('${phone.slug}')" class="btn btn-success">Explore</button>
           </div>
        `
        srcResult.appendChild(div)
    })
}

//Single item details part
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
    console.log(phone)
    const div1 = document.createElement('div')
    div1.classList.add('col-lg-3', 'col-12', 'text-center')
    div1.innerHTML = `
       <div class="p-3">
            <img src="${phone.image}">
            <h5 class="mt-1">${phone.name}</h5>
            <p>${phone.releaseDate ? phone.releaseDate : 'No date found'}</p>
       </div>
    `
    singleDetails.appendChild(div1)

    const div2 = document.createElement('div')
    div2.classList.add('col-lg-9', 'col-12')
    div2.innerHTML = `
       <div class="p-3">
            <h3>Main features</h3>
            <hr class="mt-1 mb-1">
            <h6 class="d-inline">Chipset:</h6> ${phone.mainFeatures.chipSet} <br>
            <h6 class="d-inline">Display:</h6> ${phone.mainFeatures.displaySize} <br>
            <h6 class="d-inline">Memory:</h6> ${phone.mainFeatures.memory} <br>
            <h6 class="d-inline">Sensor:</h6> ${phone.mainFeatures.sensors}
            <h3 class="mt-2">Others</h3>
            <hr class="mt-0 mb-1">
            <h6 class="d-inline">Bluetooth:</h6> ${phone.others.Bluetooth} <br>
            <h6 class="d-inline">GPS:</h6> ${phone.others.GPS} <br>
            <h6 class="d-inline">NFC:</h6> ${phone.others.NFC} <br>
            <h6 class="d-inline">USB:</h6> ${phone.others.USB}
       </div>
    `
    singleDetails.appendChild(div2)
}