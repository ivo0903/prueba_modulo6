import request from "supertest"; 
import { expect } from "chai";
import app from "../main.js";


describe('Api Anime funcionando',() =>{
    describe('Servidor esta arriba',() =>{
        it('Debería iniciar el servidor sin problemas',(done)=>{
            request(app)
            .get('/')
            .expect(404)
            .end((err,res) =>{
                if(err) return done(err);
                expect(res.status).to.equal(404);
                done();
            })
        })
    })
})

describe('CRUD de Anime', () => {
    it('Debería crear un anime exitosamente', async() => {
        const dataAnime = {
            nombre: "Akira",
            genero: "Seinen",
            anio: 1988,
            autor: "Katsuhiro Otomo",
        };

        const res = await request(app).post("/api/v1/anime").send(dataAnime);
        expect(res.status).to.equal(200);
        expect(res.body.data).to.include(dataAnime)
        expect(res.body.message).to.equal("Anime creado con éxito");
    });

    it('Debería devolver todos los animes activos', async() => {
        const res = await request(app).get("/api/v1/anime/all");
        expect(res.status).to.equal(200)
        expect(res.body.data).to.be.an('array')
        expect(res.body.message).to.equal("Animes obtenidos con éxito");
    });

    it('Debería actualizar correctamente un anime ya existente por ID', async() => {
        const id = "2cebded";

        const updateData = {
            nombre: "Akira 2",
            genero: "Seinen",
            anio: 1988,
            autor: "Katsuhiro Otomo"
        };

        const res = await request(app).put(`/api/v1/anime/${id}`).send(updateData);

        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal("Anime Actualizado");
        expect(res.body.newData).to.includes(updateData);
        expect(res.body.oldData).to.be.an("object");
        
    })
})

