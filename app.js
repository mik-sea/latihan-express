const express = require("express")
const app = express()

const PORT = process.env.PORT || 3000

const movies = [
  {id: 67, title: "Spiderman:work from home", year: 2021},
  {id: 89, title: "The Batman", year: 2022},
  {id: 99, title: "Doctor Strange: Multiverse of madness", year: 2022},
]

app.use(express.json())

app.get("/", (req, res) => {
  res.json("hello ini dari express")
})

// memberikan semua data film
app.get("/movies", (req, res) => {
  res.json(movies)
})

// memberikan semua data film berdasarkan ID
app.get("/movies/:id", (req, res) => {
  const { id } = req.params

  const movie = movies.find(item => (item.id == id))

  res.json(movie)
})

// menambahakan film
app.post("/movies", (req, res) => {
  const data = req.body

  movies.push(data)

  res.json("data berhasil di tambahkan")
})

// Menghapus film berdasarkan ID
// pakai app.DELETE()
app.delete("/movies/:id",(req,res)=>{
  const { id } = req.params
  for(let i = 0;i < movies.length;i++){
    if(movies[i].id == id){
      // menggunakan metode splice untuk menghapus array movies berdasarkan id yang diberi
      movies.splice(i,1)
      res.json("data berhasil di delete")
      break;
    }
    // jika datanya sudah terhapus dan ingin mencoba lagi maka me-return fungsi dibawah ini
    else if(movies[i].id !== id){
      res.json("data tidak ada!")
      break;
    }
  }
})

// Mengupdate film berdaasrkan ID
// pakai app.PUT()
app.put("/movies/:id",(req,res) =>{
  const { id } = req.params
  const data = req.body
  const elem = movies.findIndex((item) => item.id == id)
  if(elem >= 0){
    movies[elem].id = data.id
    movies[elem].title = data.title
    movies[elem].year = data.year
    res.json("data berhasil diubah")
  }else{
    res.json("data gagal diubah")
  }
})

app.listen(PORT, () => {
  console.log(`server running on port : ${PORT}`);
})