import { gbBase, gbTable } from './constants'

// init Airtable and base
const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(gbBase.naBaseId);

// init tables
const studentsTable = base(gbTable.students.tableName)
const locsTable = base(gbTable.locations.na.name)

/* 
    LOCATIONS API
*/

// const getLocation = async function (clientName) {

//     const records = await locsTable.select({
//         // Selecting the record with matching full name
//         maxRecords: 150,
//         view: "Grid view",
//         filterByFormula: `{School Owner} = "${clientName}"`
//     }).firstPage()


    // //console.log(records)
    // records.forEach(record => console.log(record.fields['Belt Rank']))
    // records.forEach((record) => {
    //     console.log(record.fields['School Name'])
    // })

// }





/* 
    STUDENTS API
*/

// get all students and map fields
const getStudents = async function (clientName) {
    let studentsArr = []

    const records = await studentsTable.select({
        // Selecting the record with matching full name
        maxRecords: 150,
        view: "Grid view",
        filterByFormula: `{School Owner (from Gracie Barra Location)} = "${clientName}"`
    }).firstPage()
    // console.log(records)


    // creates array of student objects with only relevant properties
    records.forEach((record) => {
        let currentRank = 'None'
        let isVerified = ''
        if (record.fields['Belt Rank']) { currentRank = record.fields['Belt Rank'] }
        if (record.fields['Belt Rank Verified']) { isVerified = record.fields['Belt Rank Verified'] }
        studentsArr.push({
            name: record.fields.Student,
            recordId: record.id,
            rank: currentRank,
            isVerified: isVerified
        })
    })

    return studentsArr
}


// PATCH Belt Rank Verification to Airtable 
const updateBeltRank = async function (id, verified) {
    let updateVerified = ''
    await studentsTable.update([
        {
            "id": id,
            "fields": {
                "Belt Rank Verified": verified,
            }
        }]).then(res => updateVerified = res[0].fields['Belt Rank Verified']) // returns response containing only new verified status text for display
        return updateVerified
}




// exports
export { getStudents, updateBeltRank, getLocation }