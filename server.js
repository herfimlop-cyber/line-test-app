const express = require("express")
const line = require("@line/bot-sdk")

const app = express()
app.use(express.json())
app.use(express.static("public"))

const config = {
 channelAccessToken: "b2fh2LSS5Tol02wcgAaglG69RToFh2PBEJ0rmt+2+usd1j9QnOdlo9iQav/mgM9WqTGTfbqPFNGlyy2dc3/4VJge9GCvwHhgPsWNzdk+b+n8/m/wfW91odnR57Y6T32Ibj6i6p3DOv8ujtXzybwdtgdB04t89/1O/w1cDnyilFU=",
 channelSecret: "8b11f8b0519a6b827f6c0c69664cf207"
}

const client = new line.Client(config)

// userId ของคุณ (ได้จาก webhook หรือ LINE userId)
const USER_ID = "Ue78fdf247dea19fe8ef461f8645ef746"

app.post("/send", async (req,res)=>{

 const text = req.body.text

 console.log("message =", text)

 try{

  await client.pushMessage(USER_ID,{
   type:"text",
   text:text
  })

  res.json({status:"sent"})

 }catch(err){

 console.log("LINE ERROR FULL:")
 console.log(err)

 if(err.response){
   console.log("LINE RESPONSE:")
   console.log(err.response.data)
 }

 res.status(500).send("error")

}

})

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
 console.log("server running")
})