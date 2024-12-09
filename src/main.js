import express from 'express';
import animeRouter from './routes/anime.routes.js'
import {errorHandler} from './middleware/errorHandler.js'


const app = express();
const PORT=3000

app.use(express.json());
app.use(express.urlencoded ({extended:true}));

app.use('/api/v1', animeRouter);


app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT} 🎈🎈`);
})

export default app

