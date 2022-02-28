const srcResult = document.getElementById('search-result')
const singleDetails = document.getElementById('single-details')
const error = document.getElementById('error')
let search = ''

const loadPhones = async () => {
    const searchField = document.getElementById('search-text')
    search = searchField.value.toLowerCase()
    searchField.value = ''
    srcResult.textContent = ''

    if (!isNaN(search) || search == '') {
        error.innerText = 'Please write something'

    } else {
        error.innerText = ''
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

const show20Result = phones => {
    let counter = 0
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
                <h5>${phone.phone_name}</h5>
                <p>${phone.brand}</p>
                <button class="btn btn-secondary">Explore</button>
           </div>
        `
        srcResult.appendChild(div)
        counter++
    })
}

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
        console.log(phone)
        const div = document.createElement('div')
        div.classList.add('col-lg-4', 'col-md-4', 'col-sm-8', 'col-8', 'text-center', 'm-auto', 'p-4')
        div.innerHTML = `
           <div class="border rounded shadow-lg p-3">
                <img src="${phone.image}">
                <h5>${phone.phone_name}</h5>
                <p>${phone.brand}</p>
                <button class="btn btn-secondary">Explore</button>
           </div>
        `
        srcResult.appendChild(div)
    })
}