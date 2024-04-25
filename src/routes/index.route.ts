import express from "express"
import { version_api } from "../helpers/version.api.helper"
import { PokeController } from "../controllers/poke.controller";

export const router = express.Router()
// Poke
router.get(`/${version_api}/poke`, PokeController.getPokeController);
router.get(`/${version_api}/poke/:poke`, PokeController.getDetailPokeController);
router.post(`/${version_api}/catch-probability`, PokeController.catchProbability);
router.post(`/${version_api}/release-poke`, PokeController.releasePoke);
router.post(`/${version_api}/rename-poke`, PokeController.renamePoke);

router.post(`/${version_api}/my-deck`, PokeController.loginWithUsername);