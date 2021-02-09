import { Router } from "express";
import fetch from "node-fetch";
import ResultsMapper from "../helpers/ResultsMapper";

const router = Router();

router.get("/", (req, res) => {
  let query = req.query.query;
  fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${query}#json/`)
    .then((res) => res.json())
    .then(function (data) {
      res.send(ResultsMapper.mapResults(data));
    });
});

router.get("/:id", (req, res) => {
  let id = req.params.id;
  let itemUrl = `https://api.mercadolibre.com/items/${id}`;
  let descripUrl = `https://api.mercadolibre.com/items/${id}/descriptions`;
  let fetchItem = fetch(itemUrl).then((res) => res.json());
  let fetchDescripUrl = fetch(descripUrl).then((res) => res.json());

  Promise.all([fetchItem, fetchDescripUrl]).then(function (results) {
    res.send(ResultsMapper.mapItem(results[0], results[1]));
  });
});

export default router;
