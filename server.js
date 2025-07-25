const express = require("express")
const bodyParse = require("body-parser")
const https = require("https")


const app = express()
app.use(bodyParse.urlencoded({extended:true}))
app.use(express.static("public"))

app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/index.html");
})

app.post('/', (req,res)=>{
    const firstname = req.body.first_name
    const lastname = req.body.last_name
    const email = req.body.email
    const data = {
        members:[{
            email_address: email,
            status : "subscribed",
            merge_fields:{
                FNAME: firstname,
                LNAME: lastname
            }
        }]
    }

    jsonData = JSON.stringify(data)


    const url="https://us16.api.mailchimp.com/3.0/lists/1718ead4f2"
    const options={
        method:"POST",
        auth:"kavi:5e4a9422315570289cf64d2e6fe96fa0-us16"
    }

    const request = https.request(url, options , (response)=>{
        response.on("data", (data)=>{
            console.log(JSON.parse(data))
        })
    })

    request.write(jsonData)
    request.end()

console.log(firstname,lastname,email)
    
})

app.listen(8080, (req,res)=>{
    console.log("Server is running on port 8080")
})




