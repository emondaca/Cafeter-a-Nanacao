const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    it("Obteniendo un 200. tipo de datos, y al mennos un objeto", async () => {
        const response = await request(server).get("/cafes").send();
        const status = response.statusCode;
        const cafes = JSON.parse(response.text); 
        expect(status).toBe(200);
        expect(typeof(cafes)).toBe("object");
        expect(cafes.length).toBeGreaterThanOrEqual(1);

    });

    it("Eliminando un café que no existe", async () => {
        const token = "Yes";
        const response = await request(server).delete("/cafes/5").send({ headers: { Authorization: `Bearer ${token}` } } );
        const status = response.statusCode;
        expect(status).toBe(404)
    });

     it("Agregando un café y obtener un 201", async () => {
        const nuevoCafe = {id: 5, nombre: "frappe"}
        const response = await request(server).post("/cafes").send(nuevoCafe);
        const status = response.statusCode;
        expect(status).toBe(201)
        expect(response.body).toContainEqual(nuevoCafe)
        console.log(response.body)
    });
    
     it("Status 400 al intentar actualizar cafe con id no incluido en el payload", async () => {
        const cambiarCafe = {id: 4, nombre: "frappe"}
        const response = await request(server).put("/cafes/3").send(cambiarCafe);
        const status = response.statusCode;
        expect(status).toBe(400)
     })

    })
