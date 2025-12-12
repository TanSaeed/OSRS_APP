import { Router } from "express";
import { Loadout } from "../models/loadout.model.js";
import { User } from "../models/user.model.js";
import { demoLoadouts } from "../demo/loadouts.js";

const isDemoMode = process.env.REACT_APP_DEMO === "true";

export const loadoutRouter = Router();

loadoutRouter.get("/", async (_req, res) => {
    if (isDemoMode) {
        return res.json(demoLoadouts);
    }


    try{
        const loadouts = await Loadout.findAll({
            include: [{ model: User, as: "user", attributes: ["id", "username", "userRole"] }],
            order: [["id", "ASC"]],
        });

        res.json(loadouts);
    } catch (error) {
        console.error("Failed to list loadouts", error);
        res.status(500).json({ message: "Failed to fetch loadouts" });
    }
});

loadoutRouter.get("/:id", async(req, res) => {
    if (isDemoMode) {
        const loadoutId = Number(req.params.id); 
        const loadout = demoLoadouts.find(item => item.id === loadoutId);

        if (!loadout) {
            return res.status(404).json({ message: "Loadout not found"});
        }
        return res.json(loadout);
    }

    try {
        const loadout = await Loadout.findByPk(Number(req.params.id), {
            include: [{ model:User, as: "user", attributes: ["id", "username", "userRole"] }],
        });

        if (!loadout) {
            return res.status(404).json({ message: "Loadout not found"});
        }

        res.json(loadout);
    } catch (error) {
        console.error("Failed to fetch loadout", error);
        res.status(404).json({ message: "Loadout not found"});
    }
});

loadoutRouter.get("/", async(req, res) => {
    if (isDemoMode) {
        return res.status(403).json({ message: "Writing Mode is disabled in Demo" });
    }

    try {
        const { userId, equipment } = req.body;

        const loadout = await Loadout.create({
            userId: userId ?? null,
            equipment: equipment ?? null,
        });
        res.status(201).json(loadout);
    } catch (error) {
        console.error("Failed to create loadout", error);
        res.status(500).json({ message: "failed to crete loadout" });
    }

});