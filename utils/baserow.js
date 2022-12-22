import axios from "axios"
let locations = []
let count = 0

// const baseRowsUrl = `https://copilot-custom-app-demo.herokuapp.com/api/database/rows/table/${table}/?user_field_names=true&page=${page}`
// const studentsURL = `https://copilot-custom-app-demo.herokuapp.com/api/database/rows/table/33/?user_field_names=true`
// const locationsURL = `https://copilot-custom-app-demo.herokuapp.com/api/database/rows/table/9/?user_field_names=true`
const studentsId = 33
const locationsId = 9
// let page = 1



let allRows = []
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
    results.forEach(result => allRows.push(result))
    const count = response.data.count
    // let last = response.data.results[results.length - 1]
    console.log(`count: ${count}`)
    console.log(`all rows length: ${allRows.length}`)
    while(allRows.length < count){
        page = page + 1
        await minifyLocations(page)
    }
    miniLocations = allRows.map((row) => ({
        id: row.id,
        name: row['School Name']
    }))
    return miniLocations
}

// const minifyRecords = (records) =>
// 	records.map((record) => ({
// 		id: record.id,
// 		fields: record.fields,
// 	}))


export const updateRow = async () => {
    axios({
        method: "PATCH",
        url: "https://copilot-custom-app-demo.herokuapp.com/api/database/rows/table/33/1046/?user_field_names=true",
        headers: {
            Authorization: `Token ${process.env.BASEROW_KEY}`,
            "Content-Type": "application/json"
        },
        data: {"test link": [
            1
        ]}
    }).then(res => console.log(res.data))
}


