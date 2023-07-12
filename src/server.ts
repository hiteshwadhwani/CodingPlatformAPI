import app from "./app"

const start =  async () => {
  try{
    app?.listen(process.env.PORT || 8000, () => {
      console.log(`Listening: http://localhost:${process.env.PORT || 8000}`)
    })
  }
  catch(error){
    console.log(error)
  }
}

//establish connection
start()