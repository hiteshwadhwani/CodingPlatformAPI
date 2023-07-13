import app from "./app"

const start =  async () => {
  try{
    app?.listen(process.env.PORT || 7000, () => {
      console.log(`Listening: http://localhost:${process.env.PORT || 7000}`)
    })
  }
  catch(error){
    console.log(error)
  }
}

//establish connection
start()