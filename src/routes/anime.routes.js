import { Router} from 'express'

import {createNewAnime,
        getAllAnime,
        updateAnimeAddById,
        deleteAnimeAddById,
        findAnimeById,
        findAnimeByName,
        deleteAnime,
        getAllActiveAnimes,
        getActiveAnimeById
} from '../controllers/anime.controller.js'



const router = Router();


router.post('/anime',createNewAnime);

router.get('/anime/admin/all',getAllAnime);
router.get('/anime/admin/:id',findAnimeById);
router.get('/anime/nombre/:nombre',findAnimeByName);
router.get('/anime/all',getAllActiveAnimes);
router.get('/anime/id/:id',getActiveAnimeById)

router.put('/anime/:id',updateAnimeAddById);
router.put('/anime/delete/:id',deleteAnime);

router.delete('/anime/:id',deleteAnimeAddById);

export default router;

