const bmiForm = document.getElementById("bmiForm")
const bmiContainer = document.getElementById("bmiContainer")
const nama = document.getElementById("nama")
const tinggiBadan = document.getElementById("tinggiBadan")
const beratBadan = document.getElementById("beratBadan")

const bmi = JSON.parse(localStorage.getItem("bmi")) || []

const addBMI = (nama, tinggiBadan, beratBadan, hasil, status) => {
    bmi.push({
        nama,
        tinggiBadan,
        beratBadan,
        hasil,
        status
    })

    localStorage.setItem("bmi", JSON.stringify(bmi))

    return {nama, tinggiBadan, beratBadan, hasil, status}
}

const createBMIelement = ({ nama, tinggiBadan, beratBadan, hasil, status}) => {
    const bmiDiv = document.createElement("div")
    const bmiNama = document.createElement("h2")
    const bmiTinggiBadan = document.createElement("p")
    const bmiBeratBadan = document.createElement("p")
    const bmiHasil = document.createElement("p")

    bmiNama.innerHTML = "Nama : " + nama
    bmiTinggiBadan.innerHTML = "Tinggi Badan : " + tinggiBadan + " cm"
    bmiBeratBadan.innerHTML = "Berat Badan : " + beratBadan + " kg"
    bmiHasil.innerHTML = "BMI : " + hasil + ", " + status

    bmiDiv.append(bmiNama, bmiTinggiBadan, bmiBeratBadan, bmiHasil)
    bmiContainer.appendChild(bmiDiv)
}

bmi.forEach(createBMIelement)

bmiForm.onsubmit = e => {
    e.preventDefault()

    let vNama = nama.value
    let vTinggiBadan = tinggiBadan.value
    let vBeratBadan = beratBadan.value
    let hasil = (vBeratBadan / ((vTinggiBadan*vTinggiBadan) / 10000)).toFixed(1)
    let status
    if (hasil < 18.5) {
        status = "<b>Berat Rendah</b>"
    } else if (hasil <= 24.9 ) {
        status = "<b>Berat Ideal</b>"
    } else if (hasil <= 29.9 ) {
        status = "<b>Berat Berlebih</b>"
    } else if (hasil >= 30) {
        status = "<b>Obesitas</b>"
    }

    const newBMI = addBMI(
        vNama,
        vTinggiBadan,
        vBeratBadan,
        hasil,
        status
    )

    createBMIelement(newBMI)

    nama.value = ""
    tinggiBadan.value = ""
    beratBadan.value = ""

}
