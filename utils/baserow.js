import axios from "axios"
let locations = []
let count = 0

const studentsURL = `https://copilot-custom-app-demo.herokuapp.com/api/database/rows/table/33/?user_field_names=true`
const locationsURL = `https://copilot-custom-app-demo.herokuapp.com/api/database/rows/table/9/?user_field_names=true`





export const getRows = async (url = studentsURL) => {
    let response = await axios({
        method: "GET",
        url: url,
        headers: {
            Authorization: `Token ${process.env.BASEROW_KEY}`
        }
    })
    let results = response.data.results
    let last = response.data.results[results.length - 1]
    console.log()
}

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


