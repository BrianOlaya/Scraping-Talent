const { Router } = require("express");  
const router = Router();

const jobs = [];

const cheerio = require("cheerio"); // Se usaron estas dos librerias para realizar el scraping
const request = require("request-promise");

async function scraping() {
  const $ = await request({
    uri: "https://www.arrivia.com/careers/job-openings/",
    transform: (body) => cheerio.load(body),
  });

  const listJobs = [];

  $("div .job-search-result").each((i, el) => {
    //Creando el objeto vacio
    const job = {
      title: "",
      location: "",
      link: "",
    };

    let prueba = "Desde JS";
    //Extrayendo el titulo
    const titles = $(el).find("h3");
    const titleJob = titles.text();
    job.title = titleJob;

    //Extrayendo la locación
    const locations = $(el).find("p");
    const locationJob = locations.text();
    job.location = locationJob;

    //Extrayendo el enlace
    const links = $(el).find("a").attr("href");
    const linkJob = `https://www.arrivia.com/${links}`;
    job.link = linkJob;

    //Agregando el objeto job al arreglro
    listJobs.push(job);
  });

  //Mostrando el lisatdo por consola
  console.log(listJobs);

  //agregando la lista a la ruta inicial
  router.get("/", (req, res) => {
    res.render("index.ejs", { listado: listJobs });
  });
}

scraping();

module.exports = router;
