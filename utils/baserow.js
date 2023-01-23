import axios from "axios"
let locations = []
let count = 0

// const baseRowsUrl = `https://copilot-custom-app-demo.herokuapp.com/api/database/rows/table/${table}/?user_field_names=true&page=${page}`
// const studentsURL = `https://copilot-custom-app-demo.herokuapp.com/api/database/rows/table/33/?user_field_names=true`
// const locationsURL = `https://copilot-custom-app-demo.herokuapp.com/api/database/rows/table/9/?user_field_names=true`
const studentsId = 33
const locationsId = 9
// let page = 1



let allLocations = []
let miniLocations = []


export const minifyLocations = async (page = 1) => {
    let response = await axios({
        method: "GET",
        url: `https://copilot-custom-app-demo.herokuapp.com/api/database/rows/table/9/?user_field_names=true&page=${page}`,
        headers: {
            Authorization: `Token ${process.env.BASEROW_KEY}`
        }
    })
    let results = response.data.results
    results.forEach(result => allLocations.push(result))
    const count = response.data.count
    // let last = response.data.results[results.length - 1]
    console.log(`count: ${count}`)
    console.log(`all rows length: ${allLocations.length}`)
    while (allLocations.length < count) {
        page = page + 1
        await minifyLocations(page)
    }
    miniLocations = allLocations.map((row) => ({
        id: row.id,
        name: row['School Name']
    }))
    return miniLocations
}

let allStudents = []
let miniStudents = []
let i = 1

export const minifyStudents = async (page) => {
    let response = await axios({
        method: "GET",
        url: `https://copilot-custom-app-demo.herokuapp.com/api/database/rows/table/33/?user_field_names=true&page=${page}`,
        headers: {
            Authorization: `Token ${process.env.BASEROW_KEY}`
        }
    })
    let results = response.data.results
    results.forEach(result => allStudents.push(result))
    const count = response.data.count
    // console.log(`count: ${count}`)
    console.log(`all students length: ${allStudents.length}`)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
// console.log(last)
// let i = 1
// while(i < 4){
//     i = i + 1
//     page = page + 1
//     await minifyStudents(page)
// }
miniStudents =  allStudents.map((row) => ({
    id: row.id,
    // name: row.Student,
    location: row['Gracie Barra Location']
}))

// let last = miniStudents[miniStudents.length - 1]
// console.log(last)
await new Promise(resolve => setTimeout(resolve, 3000));
return miniStudents
}

function compareArrays(array1, array2) {
    let matches = []
    for (let i = 0; i < array1.length; i++) {
        for (let j = 0; j < array2.length; j++) {
            if (array1[i].name === array2[j].location) {
                matches.push({ locationId: array1[i].id, studentId: array2[j].id })
            }
        }
    }
    // console.log(`location name: ${matches[0].locationFromStudent} locationID: ${matches[0].locationId} `)
    return matches;
}

const updateLink = async (rowId, locationId) => {
    await axios({
        method: "PATCH",
        url: `https://copilot-custom-app-demo.herokuapp.com/api/database/rows/table/33/${rowId}/?user_field_names=true`,
        headers: {
            Authorization: `Token ${process.env.BASEROW_KEY}`,
            "Content-Type": "application/json"
        },
        data: {
            "test link": [
                locationId
            ]
        }
    }).then(console.log(`updated row: ${rowId}`))
}

export const updateRow = async (page, locations) => {
    // let locations = await minifyLocations()
    let students = await minifyStudents(page)
    let linkId;
    let matches = await compareArrays(locations, students)
    // console.log(matches[0])
    // matches.forEach((match) => updateLink(match.studentId, match.locationId))
    for (const match of matches) {
        await updateLink(match.studentId, match.locationId);
    }

}

export const updateRowLoop = async () => {
    let locations = await minifyLocations()
    let num = 18;
    while (num < 440) {
        allStudents = []
        await updateRow(num, locations);
        num += 1;
        await new Promise(resolve => setTimeout(resolve, 3000));  // 1.5 minutes in milliseconds
    }
}


