import Surreal from "surrealdb.js"

const db = new Surreal("http://127.0.0.1:8000/rpc")

try {
    console.log("did connect, trying to signin")

    // Signin as a namespace, database, or root user
    // await db.signin({
    //     NS: "test",
    //     DB: "test",
    //     SC: "user",
    //     user: "root",
    //     pass: "root"
    // })

    console.log("signed in")

    // Select a specific namespace / database
    await db.use("test", "test")

    console.log("set the db use")

    // Create a new person with a random id
    let created = await db.create("person", {
        title: "Founder & CEO",
        name: {
            first: "Tobie",
            last: "Morgan Hitchcock"
        },
        marketing: true,
        identifier: Math.random().toString(36).substring(2, 10)
    })

    console.log("created", created)

    // Update a person record with a specific id
    let updated = await db.change("person:jaime", {
        marketing: true
    })

    console.log("updated", updated)

    // Select all people records
    let people = await db.select("person")

    console.log("people", people)

    // Perform a custom advanced query
    let groups = await db.query("SELECT marketing, count() FROM type::table(tb) GROUP BY marketing", {
        tb: "person"
    })

    console.log("groups", groups)

    let l = await db.query("LIVE SELECT * FROM person WHERE id = nogsxomdlvvldx2pe51z")
    let idx = 0
    console.log("l", idx, l)
    for await (const result of l) {
        console.log("l", idx, result)
        idx += 1
    }
} catch (e) {
    console.error("ERROR", e)
}
