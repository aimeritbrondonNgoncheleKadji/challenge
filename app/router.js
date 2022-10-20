import express from 'express';

const router = new express.Router();

import { getBoroughs, searchrestos } from './database.js';


/**
 * Déclaration des routes de l'app
 */

router.get("/", getHome);

router.get("/restos", getSearch)

/**
 * Déclaration des controlleurs de l'app
 */

/**
 * GET /
 * Page d'accueil
 */
async function getHome(req, res) {
  const boroughs = await getBoroughs();

  res.render('index', { boroughs });
}

async function getSearch(req, res) {
  const results = await searchrestos(req.data);

  res.render('search', { results });
}

async function getExploreSearch(req, res) {
  const boroughs = await getBoroughs();

  res.render('search');
}
// Exporte le routeur pour le fichier principal

export default router;